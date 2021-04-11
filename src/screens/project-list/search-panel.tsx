import React from "react";
import { Select, Input, Form } from "antd";
export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParams: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ param, setParams, users }: SearchPanelProps) => {
  return (
    <Form layout="inline" style={{ marginBottom: "2rem" }}>
      <Form.Item id="name">
        <Input
          type="text"
          placeholder="项目名"
          value={param.name}
          onChange={(evt) => setParams({ ...param, name: evt.target.value })}
        />
      </Form.Item>
      <Form.Item id="personId">
        <Select
          value={param.personId}
          onChange={(value) => setParams({ ...param, personId: value })}
        >
          <Select.Option value="">负责人</Select.Option>
          {users.map((user, index) => (
            <option key={index} value={user.id}>
              {user.name}
            </option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
