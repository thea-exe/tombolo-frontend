import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { sessionStore } from "../stores";
import AvatarUpload from "../components/settings/AvatarUpload";
import ConnectedDevices from "../components/settings/ConnectedDevices";
import FullScreenLoader from "../components/common/FullScreenLoader";
import ThemePreferences from "../components/settings/ThemePreferences";
import RecoveryKit from "../components/settings/RecoveryKit";
import Username from "../components/settings/Username";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

const SettingsRoute = () => {
  const session = useRecoilValue(sessionStore);

  if (!session.session && !session.loading) {
    return <Navigate to="/" />;
  }

  if (session.loading) {
    return <FullScreenLoader />;
  }

  return (
    <div className="">
      <div className="flex flex-col gap-2 p-6">
        <h1 className="text-xl">Profile</h1>
        <AvatarUpload />

        <Username />
      </div>
      {/* <ThemePreferences /> */}
      <div className="flex flex-col gap-2 p-6">
        <h1 className="text-xl">Security</h1>
        <Accordion allowMultiple p={0} className="border-b border-b-black">
          <AccordionItem>
            <h2>
              <AccordionButton className="border-t-2 border-t-black">
                <Box as="span" flex="1" textAlign="left">
                  Connected Devices
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <ConnectedDevices />
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton className="border-t-2 border-t-black">
                <Box as="span" flex="1" textAlign="left">
                  Recovery Kit
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <RecoveryKit />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default SettingsRoute;
