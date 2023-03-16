import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { API } from "aws-amplify";
import * as queries from "../../graphql/queries";

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
import FullScreenLoader from "../common/FullScreenLoader";
import BrandLogo from "../icons/BrandLogo";
import BrandWordmark from "../icons/BrandWordmark";
import Hamburger from "../icons/Hamburger";
import AlphaTag from "../nav/AlphaTag";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/auth";

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
  id: string;
  name: string;
  status: string;
  file_size: number;
  cost_to_date: number;
  provider_id: number;
  options: any;
};

const Authed = () => {
  const columns = [
    {
      name: "DEAL NAME",
      selector: (row: Deal) => row.name,
      sortable: true,
      cell: (row: Deal) => row.name,
    },
    {
      name: "STATUS",
      selector: (row: Deal) => row.status,
      sortable: true,
      cell: (row: Deal) => {
        const status = row.status.toLowerCase();
        if (status == "terminated") {
          return <Badge colorScheme="red">Terminated</Badge>;
        } else if (row.status == "in progress") {
          return <Badge colorScheme="green">In Progress</Badge>;
        } else if (row.status == "upload scheduled") {
          return <Badge colorScheme="blue">Upload Scheduled</Badge>;
        } else if (row.status == "data prep") {
          return <Badge colorScheme="blue">Data Prep</Badge>;
        } else {
          return <Badge>Deal Requested</Badge>;
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDeals();
  }, []);

  async function fetchDeals() {
    try {
      const apiData = await API.graphql({
        query: queries.listDeals,
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });
      if ("data" in apiData && apiData.data.listDeals.items) {
        const deals = apiData.data.listDeals.items;
        setDeals(deals);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const ExpandedComponent = () => (
    <div className="flex flex-row text-white">
      <button
        className="w-full bg-[#16181B]"
        onClick={() =>
          (window.location.href =
            "https://share.hsforms.com/1mvZF3awnRJC6ywL2aC8-tQe3p87")
        }
      >
        Data Retrieval Request
      </button>
      <button
        className="w-full bg-[#CB3535] "
        onClick={() =>
          (window.location.href =
            "https://share.hsforms.com/1mvZF3awnRJC6ywL2aC8-tQe3p87")
        }
      >
        Request Termination
      </button>
    </div>
  );

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <>
      {deals.length > 0 ? (
        <>
          <div className="xs:hidden md:block">
            <div className="relative flex h-36">
              <div className="w-full border-r-2 border-r-[#000] p-4">
                Data Stored
                <div className="absolute bottom-0 text-black font-medium text-xl mb-2 ">
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
                  onClick={() =>
                    (window.location.href =
                      "https://share.hsforms.com/1mvZF3awnRJC6ywL2aC8-tQe3p87")
                  }
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
                  <h1 className="text-xl mt-12 mb-2 ml-2 font-medium">
                    Filters
                  </h1>
                  <DrawerBody p={0}>
                    {/* thea: use mapping function when cleaning up */}
                    <Accordion
                      allowMultiple
                      className="border-b border-b-black"
                    >
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
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
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
              data={deals}
              customStyles={customStyles}
              expandableRows
              expandableRowsComponent={ExpandedComponent}
            />
          </div>
          {/* THIS IS MOBILE  */}
          <div className="xs:block md:hidden">
            <div className="flex items-center cursor-pointer gap-1 pl-2 border-b border-b-2 border-b-black">
              <BrandLogo />
              <BrandWordmark />
              <AlphaTag />

              <label
                htmlFor="sidebar-nav"
                className="drawer-button cursor-pointer -translate-x-2 ml-auto"
              >
                <Hamburger />
              </label>
            </div>
            <div className="p-6">
              <div className="bg-white">
                Data Stored
                <div className="font-medium text-lg">123,000TiB</div>
              </div>
              <div className="flex flex-row gap-2 pt-2 relative">
                <div className="w-full bg-white">
                  Storage Providers
                  <div className="absolute bottom-0 font-medium text-lg mb-2">
                    2
                  </div>
                </div>
                <div className="w-full bg-white">
                  Money Saved
                  <div className="font-medium text-lg mb-2">2</div>
                </div>
              </div>

              <div>search</div>
            </div>
          </div>
        </>
      ) : (
        <>
          <NoDeal />
        </>
      )}
    </>
  );
};

export default Authed;
