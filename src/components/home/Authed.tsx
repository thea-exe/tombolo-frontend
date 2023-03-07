import { useState } from "react";
import DataTable from "react-data-table-component";

import {
  AddIcon,
  ChevronDownIcon,
  HamburgerIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import Separator from "../icons/Separator";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  useDisclosure,
} from "@chakra-ui/react";
import NoDeal from "./NoDeal";
import { View, Authenticator } from "@aws-amplify/ui-react";

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
      } else if (row.status == "Upload Scheduled") {
        return <Badge colorScheme="blue">Upload Scheduled</Badge>;
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
    deal_name: "apple",
    status: "In Progress",
    file_size: 1000,
    upload_date: "12/12/12",
    cost_to_date: 12,
    provider_id: 1234456,
  },
  {
    id: 2,
    deal_name: "baby",
    status: "Upload Scheduled",
    file_size: 2000,
    upload_date: "12/12/12",
    cost_to_date: 123,
    provider_id: 1234456,
  },
  {
    id: 3,
    deal_name: "cat",
    status: "Data Prep",
    file_size: 3000,
    upload_date: "12/12/12",
    cost_to_date: 345,
    provider_id: 1234456,
  },
  {
    id: 4,
    deal_name: "dude",
    status: "Terminated",
    file_size: 4000,
    upload_date: "12/12/12",
    cost_to_date: 2345,
    provider_id: 1234456,
  },
  {
    id: 5,
    deal_name: "elephant",
    status: "In Progress",
    file_size: 5000,
    upload_date: "12/12/12",
    cost_to_date: 345,
    provider_id: 1234456,
  },
  {
    id: 6,
    deal_name: "fan",
    status: "In Progress",
    file_size: 6000,
    upload_date: "12/12/12",
    cost_to_date: 345,
    provider_id: 1234456,
  },
  {
    id: 7,
    deal_name: "gator",
    status: "In Progress",
    file_size: 7000,
    upload_date: "12/12/12",
    cost_to_date: 323,
    provider_id: 1234456,
  },
  {
    id: 8,
    deal_name: "hat",
    status: "In Progress",
    file_size: 1000,
    upload_date: "12/12/12",
    cost_to_date: 323,
    provider_id: 1234456,
  },
  {
    id: 9,
    deal_name: "igloo",
    status: "In Progress",
    file_size: 1000,
    upload_date: "12/12/12",
    cost_to_date: 323,
    provider_id: 1234456,
  },
];
const stats = [
  { name: "Data Stored", stat: "123,00TiB" },
  { name: "Storage Providers", stat: "2" },
  { name: "Money Saved", stat: "$0" },
];

const Authed = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isClicked, setIsClicked] = useState(false); // take out after example
  function handleClick() {
    setIsClicked(!isClicked);
  } // take out after example
  return (
    <>
      <View>
        <Authenticator loginMechanisms={["email"]}>
          {({ user, signOut }) => (
            <div>
              <h1>Hello, {user.username}</h1>
              <button onClick={signOut}>Sign Out</button>
            </div>
          )}
        </Authenticator>
      </View>
      {isClicked ? (
        <>
          <div className="relative flex h-36">
            <div className="w-full border-r-2 border-r-[#000] p-4">
              Data Stored
              <div className="absolute bottom-0 text-red-600 md:text-black font-medium text-xl mb-2 ">
                123,000TiB
              </div>
            </div>
            <div className="w-full border-r-2 border-r-[#000] p-4">
              Storage Providers
              <div className="absolute bottom-0 font-medium text-xl mb-2">
                2
              </div>
            </div>
            <div className="w-full p-4">
              Money Saved
              <div className="text-slate-500 text-xs">
                Compared to AWS Glacier
              </div>
              <div className="absolute bottom-0 font-medium text-xl mb-2">
                $0
              </div>
            </div>
          </div>
          <div className="border-t-2 border-t-[#000] pb-44">
            <div className="flex mt-4">
              <Button
                leftIcon={<AddIcon />}
                colorScheme="blue"
                variant="solid"
                ml={4}
                w={60}
              >
                New Deal
              </Button>
              <div className="flex gap-4 ml-auto">
                <Button
                  leftIcon={<HamburgerIcon />}
                  className=""
                  onClick={onOpen}
                  colorScheme="black"
                  variant="outline"
                  bgColor="white"
                  borderColor="white"
                >
                  Filter
                </Button>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.400" />
                  </InputLeftElement>
                  <Input
                    htmlSize={40}
                    width="auto"
                    type="tel"
                    placeholder="Search"
                    bgColor="white"
                  />
                </InputGroup>
              </div>
            </div>
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay bgColor="#16181BE5" />
              <DrawerContent>
                <h1 className="text-xl mt-12 mb-2 ml-2 font-medium">Filters</h1>
                <DrawerBody p={0}>
                  {/* thea: use mapping function when cleaning up */}
                  <Accordion allowMultiple className="border-b border-b-black">
                    <AccordionItem>
                      <h2>
                        <AccordionButton className="border-t-2 border-t-black pt-4 pb-4">
                          <Box
                            as="span"
                            flex="1"
                            textAlign="left"
                            className="font-bold mb-2 text-xs mt-2"
                          >
                            STATUS
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <div className="flex flex-col gap-1">
                          <Checkbox>Data Prep</Checkbox>
                          <Checkbox>In Progress</Checkbox>
                          <Checkbox>Upload Scheduled</Checkbox>
                          <Checkbox>Terminated</Checkbox>
                        </div>
                      </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                      <h2>
                        <AccordionButton className="border-t-2 border-t-black">
                          <Box
                            as="span"
                            flex="1"
                            textAlign="left"
                            className="font-bold mb-2 text-xs mt-2"
                          >
                            FILE SIZE
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <RangeSlider
                          aria-label={["min", "max"]}
                          colorScheme="gray"
                          defaultValue={[10, 30]}
                        >
                          <RangeSliderTrack>
                            <RangeSliderFilledTrack />
                          </RangeSliderTrack>
                          <RangeSliderThumb index={0} />
                          <RangeSliderThumb index={1} />
                        </RangeSlider>
                        <div className="flex items-center gap-2 pt-4">
                          <InputGroup size="md">
                            <Input pr="2rem" placeholder="0" />
                            <InputRightElement width="3rem">
                              <p className="text-[#00143140]">TiB</p>
                            </InputRightElement>
                          </InputGroup>
                          <Separator />
                          <InputGroup size="md">
                            <Input pr="2rem" placeholder="1000000" />
                            <InputRightElement width="3rem">
                              <p className="text-[#00143140]">TiB</p>
                            </InputRightElement>
                          </InputGroup>
                        </div>
                        <Button colorScheme="blue" variant="link" size="xs">
                          Clear
                        </Button>
                      </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                      <h2>
                        <AccordionButton className="border-t-2 border-t-black">
                          <Box
                            as="span"
                            flex="1"
                            textAlign="left"
                            className="font-bold mb-2 text-xs mt-2"
                          >
                            UPLOAD DATE
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Menu>
                          <MenuButton
                            as={Button}
                            rightIcon={<ChevronDownIcon />}
                            className="w-full text-left"
                            variant="outline"
                          >
                            Specific Range
                          </MenuButton>
                          <MenuList>
                            <MenuItem>Download</MenuItem>
                            <MenuItem>Create a Copy</MenuItem>
                            <MenuItem>Mark as Draft</MenuItem>
                            <MenuItem>Delete</MenuItem>
                            <MenuItem>Attend a Workshop</MenuItem>
                          </MenuList>
                        </Menu>
                        <div className="flex items-center gap-2 pt-4">
                          <div className="w-1/2">
                            <p className="text-[#00143140] text-xs">From</p>
                            <Input
                              placeholder="Select Date"
                              size="md"
                              type="date"
                            />
                          </div>

                          <div className="w-1/2">
                            <p className="text-[#00143140] text-xs">To</p>
                            <Input
                              placeholder="Select Date"
                              size="md"
                              type="date"
                            />
                          </div>
                        </div>
                        <Button colorScheme="blue" variant="link" size="xs">
                          Clear
                        </Button>
                      </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                      <h2>
                        <AccordionButton className="border-t-2 border-t-black">
                          <Box
                            as="span"
                            flex="1"
                            textAlign="left"
                            className="font-bold mb-2 text-xs mt-2"
                          >
                            COST-TO-DATE
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel
                        pb={4}
                        className="border-b-2 border-b-black"
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </DrawerBody>
                <DrawerFooter
                  borderTopWidth="2px"
                  borderTopColor="black"
                  className="mt-12"
                >
                  <Button colorScheme="black" variant="outline" mr="auto">
                    Clear All
                  </Button>
                  <Button bgColor="#000" textColor="white" variant="white">
                    Save Filters
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
          <DataTable
            columns={columns}
            data={data}
            customStyles={customStyles}
          />
        </>
      ) : (
        <NoDeal />
      )}
      <Button onClick={handleClick} /> {/* TAKE BUTTON OUT */}
    </>
  );
};

export default Authed;
