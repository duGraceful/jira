import React from "react";
import { Table } from "antd";
import { User } from "./search-panel";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: Boolean;
  origanization: string;
}

interface ListProps {
  list: Project[];
  users: User[];
}

export const List = ({ list, users }: ListProps) => {
  const columns = [
    {
      dataIndex: "name",
      title: "名称",
      sorter: (a: Project, b: Project) => a.name.localeCompare(b.name),
    },
    {
      dataIndex: "personName",
      title: "名称",
      render(value: string, project: Project) {
        return (
          <span>
            {users.find((user: User) => user.id === project.personId)?.name ||
              "未知"}
          </span>
        );
      },
    },
  ];

  return <Table pagination={false} columns={columns} dataSource={list} />;
};
