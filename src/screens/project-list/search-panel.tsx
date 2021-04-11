import React from "react";
import { Select, Input } from "antd";
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
    <form action="">
      <div>
        <Input
          type="text"
          value={param.name}
          onChange={(evt) => setParams({ ...param, name: evt.target.value })}
        />
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
      </div>
    </form>
  );
};
