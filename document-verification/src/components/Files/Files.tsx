import "./files.css";
import React, { useEffect, useState } from "react";
import FooterComponent from "../Footer/FooterComponent";
import { Table, Row, Col, Switch } from "antd";
import { contractAddress } from "../../utils/common";
import AsideBarComponent from "../AsideBar/AsideBarComponent";
import FileUploader from "../sideFiles/sideFiles";
import { Link } from "react-router-dom";
import UploadFile from "./ApiPostData";
import ViewTable from "./ViewTable";
interface Employee {
  name: string;
  walletAddress: string;
  status: boolean;
}
const Files = () => {
  const contract = contractAddress();

  const [employees, setEmployees] = useState<Employee[]>([]);

  const getAllEmployees = async () => {
    try {
      if (contract) {
        //@ts-ignore
        const allEmployees = await contract.getAllEmployees();
        setEmployees(allEmployees);
      }
    } catch (err) {
      console.error("Failed to get all employees:", err);
    }
  };

  const addToBlacklist = async (walletAddress: string) => {
    try {
      if (contract) {
        //@ts-ignore
        const tx = await contract.addToBlacklist(walletAddress);
        await tx.wait();
        console.log("===========address ===========", walletAddress);

        console.log("Wallet address added to blacklist successfully.");
      }
    } catch (err) {
      console.error("Failed to add to blacklist:", err);
    }
  };

  const removeFromBlacklist = async (walletAddress: string) => {
    try {
      if (contract) {
        //@ts-ignore
        console.log("============addresss==============", walletAddress);
        //@ts-ignore
        const tx = await contract.removeFromBlacklist(walletAddress);
        await tx.wait();
        console.log("Wallet address removed from blacklist successfully.");
      }
    } catch (err) {
      console.error("Failed to remove from blacklist:", err);
    }
  };

  useEffect(() => {
    getAllEmployees();
  }, [contract]);

  const regenerateOnClick = async (id: string, status: boolean) => {
    if (status) {
      await addToBlacklist(id);
    } else {
      await removeFromBlacklist(id);
    }
  };

  return (
    <div>
      <div className="WebDesign">
        <Row className="WebDesignRow">
          <AsideBarComponent />

          <Col span={14} push={0}>
            <div>
              <h1 className="headingUploadedFiles">Uploaded Files</h1>
            </div>
            <div>
              <p className="paraUploadedFiles">
                Files that are been attached to this account
              </p>
            </div>
            <div>
              <div className="ButtonsSelect">
                <div className="buttonUploadedFiles">
                  <Link to="/files/all" className="buttonUploadedFilesViewAll">
                    {" "}
                    View All{" "}
                  </Link>
                  <Link
                    to="/files/verified"
                    className="buttonUploadedFilesVerified"
                  >
                    Verified
                  </Link>
                  <Link
                    to="/files/tempered"
                    className="buttonUploadedFilesTempered"
                  >
                    Tempered
                  </Link>
                </div>
              </div>
            </div>
            <ViewTable />
          </Col>

          <Col span={5} push={1}>
            <div className="asideFilesUpload">
              <div>
                <h1 className="filesHeading">Files</h1>
                <p className="filespara">View all you projexts here</p>
              </div>
              <div className="FileUploader">
                <UploadFile />
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className="MobileDesign">
        <Row className="MobileDesignUploader">
          <Col span={5} push={1}>
            <div className="asideFilesUpload">
              <div>
                <h1 className="MobilesfilesHeading">Upload Files</h1>
              </div>
              <div className="FileUploader">
                <FileUploader />
                <UploadFile />
              </div>
            </div>
          </Col>
        </Row>
        <Row className="MobileDesignTable">
          <Col span={14} push={0}>
            <div>
              <h1 className="MobileheadingUploadedFiles">Uploaded Files</h1>
            </div>
            <div>
              <p className="MObileparaUploadedFiles">
                Files that are been attached to this account
              </p>
            </div>
            <div>
              <div className="MobileButtonsSelect">
                <div className="buttonUploadedFiles">
                  <Link to="/files/all" className="buttonUploadedFilesViewAll">
                    {" "}
                    View All{" "}
                  </Link>
                  <Link
                    to="/files/verified"
                    className="buttonUploadedFilesVerified"
                  >
                    Verified
                  </Link>
                  <Link
                    to="/files/tempered"
                    className="buttonUploadedFilesTempered"
                  >
                    Tempered
                  </Link>
                </div>
              </div>
            </div>
            <ViewTable />
          </Col>
        </Row>
      </div>
      <FooterComponent />
    </div>
  );
};

export default Files;
