import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { cleanObject, useMount, useDebounce } from "utils";
import { useHttp } from "utils/http";
import { SearchPanel } from "./search-panel";
import { List } from "./list";

export const ProjectListScreen = () => {
  const [param, setParams] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);

  const debounceParam = useDebounce(param, 200);

  const client = useHttp();

  useEffect(() => {
    client("projects", { data: cleanObject(debounceParam) }).then(setList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParam]);

  useMount(() => {
    client("users").then(setUsers);
  });
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParams={setParams} users={users} />
      <List list={list} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
