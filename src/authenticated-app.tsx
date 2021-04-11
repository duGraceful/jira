import React from "react";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import { Button, Dropdown, Menu } from "antd";
import styled from "@emotion/styled";
import { Row } from "component/lib";
import { ReactComponent as Logo } from "assets/logo.svg";

/**
 * grid 和 flex 各自的应用场景
 * 1、要考虑，是一维布局，还是二维布局
 * 一般来说，一维布局用flex,二维布局用grid
 * 2、是从内容出发还是从布局出发
 * 从内容出发，你先有一组数据，数据一般不固定，然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发，先规划网格，数量一般比较固定，然后再把元素往里填充
 * 从内容出发用flex
 * 从布局出发，用grid
 */

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <Logo width={"3rem"} />
          <Row>Logo</Row>
          <Row>项目</Row>
          <Row as="div">用户</Row>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="lpgout">
                  <Button type="link" onClick={logout}>
                    登出
                  </Button>
                </Menu.Item>
              </Menu>
            }
          >
            <Button type="link">Hi, {user?.name}</Button>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-areas: "header" "main";
  height: 100vh;
`;

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)`
  display: flex;
  align-items: center;
`;

const HeaderRight = styled.div``;

const Main = styled.main`
  grid-area: main;
`;
