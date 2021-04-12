import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { cleanObject, useMount, useDebounce } from "utils";
import { useHttp } from "utils/http";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { Typography } from "antd";

export const ProjectListScreen = () => {
  const [param, setParams] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  const debounceParam = useDebounce(param, 200);

  const client = useHttp();

  useEffect(() => {
    setLoading(true);
    client("projects", { data: cleanObject(debounceParam) })
      .then(setList)
      .catch((error) => {
        setError(error);
        setList([]);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParam]);

  useMount(() => {
    client("users").then(setUsers);
  });
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParams={setParams} users={users} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List dataSource={list} users={users} loading={loading} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
