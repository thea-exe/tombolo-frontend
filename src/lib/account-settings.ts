import * as wn from "webnative";
import { retrieve } from "webnative/common/root-key";
import * as uint8arrays from "uint8arrays";
import { getRecoil, setRecoil } from "recoil-nexus";
import type { CID } from "multiformats/cid";
import type { PuttableUnixTree, File as WNFile } from "webnative/fs/types";
import type { Metadata } from "webnative/fs/metadata";

import { fileToUint8Array } from "./utils";
import { accountSettingsStore, filesystemStore, sessionStore } from "../stores";
import { addNotification } from "./notifications";

export type Avatar = {
  cid: string;
  ctime: number;
  name: string;
  size?: number;
  src: string;
};

export type AccountSettings = {
  avatar: Avatar;
  loading: boolean;
};

interface AvatarFile extends PuttableUnixTree, WNFile {
  cid: CID;
  content: Uint8Array;
  header: {
    content: Uint8Array;
    metadata: Metadata;
  };
}

export const ACCOUNT_SETTINGS_DIR = wn.path.directory("private", "settings");
const AVATAR_DIR = wn.path.combine(
  ACCOUNT_SETTINGS_DIR,
  wn.path.directory("avatars")
);
const AVATAR_ARCHIVE_DIR = wn.path.combine(
  AVATAR_DIR,
  wn.path.directory("archive")
);
const AVATAR_FILE_NAME = "avatar";
const FILE_SIZE_LIMIT = 20;

/**
 * Move old avatar to the archive directory
 */
const archiveOldAvatar = async (): Promise<void> => {
  const fs = getRecoil(filesystemStore);

  // Return if user has not uploaded an avatar yet
  const avatarDirExists = await fs.exists(AVATAR_DIR);
  if (!avatarDirExists) {
    return;
  }

  // Find the filename of the old avatar
  const links = await fs.ls(AVATAR_DIR);
  const oldAvatarFileName = Object.keys(links).find((key) =>
    key.includes(AVATAR_FILE_NAME)
  );
  const oldFileNameArray = oldAvatarFileName.split(".")[0];
  const archiveFileName = `${oldFileNameArray[0]}-${Date.now()}.${
    oldFileNameArray[1]
  }`;

  // Move old avatar to archive dir
  const fromPath = wn.path.combine(AVATAR_DIR, wn.path.file(oldAvatarFileName));
  const toPath = wn.path.combine(
    AVATAR_ARCHIVE_DIR,
    wn.path.file(archiveFileName)
  );
  await fs.mv(fromPath, toPath);

  // Announce the changes to the server
  await fs.publish();
};

/**
 * Get the Avatar from the user's WNFS and construct its `src`
 */
export const getAvatarFromWNFS = async (): Promise<void> => {
  const accountSettings = getRecoil(accountSettingsStore);

  try {
    const fs = getRecoil(filesystemStore);

    // Set loading: true on the accountSettingsStore
    setRecoil(accountSettingsStore, { ...accountSettings, loading: true });

    // If the avatar dir doesn't exist, silently fail and let the UI handle it
    const avatarDirExists = await fs.exists(AVATAR_DIR);
    if (!avatarDirExists) {
      setRecoil(accountSettingsStore, { ...accountSettings, loading: false });
      return;
    }

    // Find the file that matches the AVATAR_FILE_NAME
    const links = await fs.ls(AVATAR_DIR);
    const avatarName = Object.keys(links).find((key) =>
      key.includes(AVATAR_FILE_NAME)
    );

    // If user has not uploaded an avatar, silently fail and let the UI handle it
    if (!avatarName) {
      setRecoil(accountSettingsStore, { ...accountSettings, loading: false });
      return;
    }

    const file = await fs.get(
      wn.path.combine(AVATAR_DIR, wn.path.file(`${avatarName}`))
    );

    // The CID for private files is currently located in `file.header.content`
    const cid = (file as AvatarFile).header.content.toString();

    // Create a base64 string to use as the image `src`
    const src = `data:image/jpeg;base64, ${uint8arrays.toString(
      (file as AvatarFile).content,
      "base64"
    )}`;

    const avatar = {
      cid,
      ctime: (file as AvatarFile).header.metadata.unixMeta.ctime,
      name: avatarName,
      src,
    };

    // Push images to the accountSettingsStore
    setRecoil(accountSettingsStore, {
      ...accountSettings,
      avatar,
      loading: false,
    });
  } catch (error) {
    console.error(error);
    setRecoil(accountSettingsStore, {
      ...accountSettings,
      avatar: null,
      loading: false,
    });
  }
};

/**
 * Upload an avatar image to the user's private WNFS
 * @param image
 */
export const uploadAvatarToWNFS = async (image: File): Promise<void> => {
  try {
    const accountSettings = getRecoil(accountSettingsStore);
    const fs = getRecoil(filesystemStore);

    // Set loading: true on the accountSettingsStore
    setRecoil(accountSettingsStore, { ...accountSettings, loading: true });

    // Reject files over 20MB
    const imageSizeInMB = image.size / (1024 * 1024);
    if (imageSizeInMB > FILE_SIZE_LIMIT) {
      throw new Error("Image can be no larger than 20MB");
    }

    // Archive old avatar
    await archiveOldAvatar();

    // Rename the file to `avatar.[extension]`
    const updatedImage = new File(
      [image],
      `${AVATAR_FILE_NAME}.${image.name.split(".")[1]}`,
      {
        type: image.type,
      }
    );

    // Create a sub directory and add the avatar
    await fs.write(
      wn.path.combine(AVATAR_DIR, wn.path.file(updatedImage.name)),
      await fileToUint8Array(updatedImage)
    );

    // Announce the changes to the server
    await fs.publish();

    addNotification({ msg: `Your avatar has been updated!`, type: "success" });
  } catch (error) {
    addNotification({ msg: error.message, type: "error" });
    console.error(error);
  }
};

export const generateRecoveryKit = async (): Promise<string> => {
  const {
    program: {
      components: { crypto, reference },
    },
    username: { full, hashed, trimmed },
  } = getRecoil(sessionStore);

  // Get the user's read-key and base64 encode it
  const accountDID = await reference.didRoot.lookup(hashed);
  const readKey = await retrieve({ crypto, accountDID });
  const encodedReadKey = uint8arrays.toString(readKey, "base64pad");

  // Get today's date to display in the kit
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const date = new Date();

  const content = `#     %@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%
#   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
# %@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%
# @@@@@%     %@@@@@@%         %@@@@@@@%     %@@@@@
# @@@@@       @@@@@%            @@@@@@       @@@@@
# @@@@@%      @@@@@             %@@@@@      %@@@@@
# @@@@@@%     @@@@@     %@@%     @@@@@     %@@@@@@
# @@@@@@@     @@@@@    %@@@@%    @@@@@     @@@@@@@
# @@@@@@@     @@@@%    @@@@@@    @@@@@     @@@@@@@
# @@@@@@@    %@@@@     @@@@@@    @@@@@%    @@@@@@@
# @@@@@@@    @@@@@     @@@@@@    %@@@@@    @@@@@@@
# @@@@@@@    @@@@@@@@@@@@@@@@     @@@@@    @@@@@@@
# @@@@@@@    %@@@@@@@@@@@@@@@     @@@@%    @@@@@@@
# @@@@@@@     %@@%     @@@@@@     %@@%     @@@@@@@
# @@@@@@@              @@@@@@              @@@@@@@
# @@@@@@@%            %@@@@@@%            %@@@@@@@
# @@@@@@@@@%        %@@@@@@@@@@%        %@@@@@@@@@
# %@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%
#   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
#     %@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%
#
# This is your recovery kit. (It’s a yaml text file)
#
# Created for ${trimmed} on ${date.toLocaleDateString("en-US", options)}
#
# Store this somewhere safe.
#
# Anyone with this file will have read access to your private files.
# Losing it means you won’t be able to recover your account
# in case you lose access to all your linked devices.
#
# Our team will never ask you to share this file.
#
# To use this file, go to ${window.location.origin}/recover/
# Learn how to customize this kit for your users: https://guide.fission.codes/
username: ${full}
key: ${encodedReadKey}`;

  return content;
};
