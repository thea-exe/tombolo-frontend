import { ArrowForwardIcon, Icon } from "@chakra-ui/icons";
import { HStack } from "@chakra-ui/react";
import React from "react";
import { SiTwitter, SiMedium, SiInstagram, SiDiscord } from "react-icons/si";
import { Link } from "react-router-dom";

const NoDeal = () => {
  return (
    <div className="h-screen flex justify-center content-center">
      <div className="text-xl font-medium mt-auto mb-auto">
        You don&apos;t have any storage deals yet.
        <p className="break-after-colum"></p>
        <Link
          className="text-[#5299E0] underline underline-offset-4"
          to={"https://share.hsforms.com/1mvZF3awnRJC6ywL2aC8-tQe3p87"}
        >
          Request
        </Link>{" "}
        your first deal or learn more
        <div className="flex">
          about Tombolo
          <HStack spacing={2} direction="row">
            <ArrowForwardIcon />
            <Icon
              w={30}
              h={30}
              as={SiTwitter}
              onClick={() =>
                window.open("https://twitter.com/BanyanComputer", "_blank")
              }
            />
            <Icon
              w={30}
              h={30}
              as={SiMedium}
              onClick={() =>
                window.open("https://medium.com/@banyan.computer", "_blank")
              }
            />
            <Icon
              w={30}
              h={30}
              as={SiInstagram}
              onClick={() =>
                window.open(
                  "https://www.instagram.com/banyan.computer/",
                  "_blank"
                )
              }
            />
            <Icon
              w={30}
              h={30}
              as={SiDiscord}
              onClick={() =>
                window.open("https://discord.com/invite/RdqBjFjUpk", "_blank")
              }
            />
          </HStack>
        </div>
      </div>
    </div>
  );
};

export default NoDeal;
