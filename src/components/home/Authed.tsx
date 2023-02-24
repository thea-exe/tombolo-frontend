import React, { useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

import { ArrowForwardIcon, Icon } from "@chakra-ui/icons";
import { SiDiscord, SiInstagram, SiTwitter, SiMedium } from "react-icons/si";
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Square,
} from "@chakra-ui/react";

const customStyles = {
  headRow: {
    style: {
      borderTopWidth: "2px",
      borderTopColor: "#000",
      borderTopStyle: "solid",
      borderBottomWidth: "2px",
      borderBottomColor: "#000",
      borderBottomStyle: "solid",
      fontWeight: 700,
    },
  },
};

type Deal = {
  deal_name: string;
  status: string;
  file_size: number;
  upload_date: string;
  cost_to_date: number;
  provider_id: number;
};
const columns = [
  {
    name: "DEAL NAME",
    selector: (row: Deal) => row.deal_name,
    sortable: true,
  },
  {
    name: "STATUS",
    selector: (row: Deal) => row.status,
    sortable: true,
    cell: (row: Deal) => {
      if (row.status == "Terminated") {
        return <Badge colorScheme="red">Terminated</Badge>;
      } else if (row.status == "In Progress") {
        return <Badge colorScheme="green">In Progress</Badge>;
      } else {
        return <Badge>Data Prep</Badge>;
      }
    },
  },
  {
    name: "FILE SIZE",
    selector: (row: Deal) => row.file_size,
    sortable: true,
    cell: (row: Deal) => row.file_size + " TiB",
  },
  {
    name: "UPLOAD DATE",
    selector: (row: Deal) => row.upload_date,
    sortable: true,
  },
  {
    name: "COST-TO-DATE",
    selector: (row: Deal) => row.cost_to_date,
    sortable: true,
    cell: (row: Deal) => "$" + row.cost_to_date,
  },
  {
    name: "PROVIDER ID",
    selector: (row: Deal) => row.provider_id,
    sortable: true,
    cell: (row: Deal) => "#" + row.provider_id,
  },
];

const data = [
  {
    id: 1,
    deal_name: "d",
    status: "In Progress",
    file_size: 1000,
    upload_date: "12/12/12",
    cost_to_date: 12,
    provider_id: 1234456,
  },
  {
    id: 2,
    deal_name: "d",
    status: "Data Prep",
    file_size: 1000,
    upload_date: "12/12/12",
    cost_to_date: 123,
    provider_id: 1234456,
  },
  {
    id: 3,
    deal_name: "d",
    status: "Data Prep",
    file_size: 1000,
    upload_date: "12/12/12",
    cost_to_date: 345,
    provider_id: 1234456,
  },
  {
    id: 4,
    deal_name: "d",
    status: "Terminated",
    file_size: 1000,
    upload_date: "12/12/12",
    cost_to_date: 2345,
    provider_id: 1234456,
  },
  {
    id: 5,
    deal_name: "d",
    status: "In Progress",
    file_size: 1000,
    upload_date: "12/12/12",
    cost_to_date: 345,
    provider_id: 1234456,
  },
  {
    id: 6,
    deal_name: "d",
    status: "In Progress",
    file_size: 1000,
    upload_date: "12/12/12",
    cost_to_date: 323,
    provider_id: 1234456,
  },
  {
    id: 7,
    deal_name: "d",
    status: "Terminated",
    file_size: 1000,
    upload_date: "12/12/12",
    cost_to_date: 4345,
    provider_id: 1234456,
  },
];

const Authed = () => {
  return (
    <>
      <div>
        <Flex color="white">
          <Center w="100px" bg="green.500">
            <p>Box 1</p>
          </Center>
          <Square bg="blue.500" size="150px">
            <p>Box 2</p>
          </Square>
          <Box flex="1" bg="tomato">
            <p>Box 3</p>
          </Box>
        </Flex>
        <DataTable columns={columns} data={data} customStyles={customStyles} />
      </div>
      <div className="min-h-[calc(100vh-128px)] md:min-h-[calc(100vh-160px)] pt-8 md:pt-16 flex flex-col items-start max-w-[690px] m-auto gap-10 pb-5 text-sm">
        {/* <>
      <div className="text-xl font-medium mt-auto mb-auto">
        You don&apos;t have any storage deals yet.
        <Link to={""} className="text-[#5299E0] underline underline-offset-4">
          {" "}
          Request
        </Link>{" "}
        your first deal or learn more about Tombolo
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
    </> */}
      </div>
    </>
  );
};

export default Authed;
