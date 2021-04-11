import React from "react";
import { Table } from "antd";
import { User } from "./search-panel";
import dayjs from "dayjs";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: Boolean;
  organization: string;
  created: number;
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
      dataIndex: "organization",
      title: "部门",
    },
    {
      title: "负责人",
      render(value: string, project: Project) {
        return (
          <span>
            {users.find((user: User) => user.id === project.personId)?.name ||
              "未知"}
          </span>
        );
      },
    },
    {
      title: "创建时间",
      render(value: string, project: Project) {
        return (
          <span>
            {project.created
              ? dayjs(project.created).format("YYYY-MM-DD")
              : "无"}
          </span>
        );
      },
    },
  ];

  return <Table pagination={false} columns={columns} dataSource={list} />;
};
