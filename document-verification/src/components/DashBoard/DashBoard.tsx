import React, { useEffect, useState } from "react";
import "./DashBoardScreenComponent.css";
import { Table, Row, Col, Switch } from "antd";
import { contractAddress } from "../../utils/common";
import AsideBarComponent from "../AsideBar/AsideBarComponent";

interface Employee {
  name: string;
  walletAddress: string;
  status: boolean;
}

const DashBoard = () => {
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
    <div className="dashboard1">
      <AsideBarComponent />
      <div className="container">
        <Row justify="center">
          <Col span={18}>
            <div className="dashboardFoot">
              {employees.length > 0 ? (
                <Table
                  dataSource={employees}
                  columns={[
                    {
                      title: "Name",
                      dataIndex: "name",
                      key: "name",
                    },
                    {
                      title: "Address",
                      dataIndex: "walletAddress",
                      key: "walletAddress",
                    },
                    {
                      title: "Status",
                      dataIndex: "status",
                      key: "status",
                      render: (
                        status: boolean,
                        record: Employee,
                        index: number
                      ) => (
                        <Switch
                          checked={status}
                          // checkedChildren="Whitelisted"
                          // unCheckedChildren="Blacklisted"
                          onClick={(checked) =>
                            regenerateOnClick(
                              record.walletAddress,
                              record.status
                            )
                          }
                        />
                      ),
                    },
                  ]}
                  pagination={false}
                />
              ) : (
                <p className="dashboardFeed">No documents found!</p>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DashBoard;
