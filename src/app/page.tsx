"use client";
import {
  MantineProvider,
  Button,
  Flex,
  Paper,
  TextInput,
  Tabs,
  Space,
  Stack,
  Group,
  CopyButton,
  Center,
  Text,
} from "@mantine/core";
import React, { useState } from "react";
import { useGameHomeConfix } from "./context";

function UsernameTab({
  nextTab,
  target,
}: {
  nextTab: () => void;
  target: "host" | "join";
}) {
  const homeConfix = useGameHomeConfix();
  const [username, setUsername] = useState<string | null>(null);

  const nextBtnDisabled = () => {
    if (username == null) return true;

    return username.trim() == "" || username.trim().length < 2;
  };

  const nextBtnOnClick = () => {
    if (username == null) return;
    homeConfix.setUsername(username);
    homeConfix.setSelection(target);
    nextTab();
  };

  return (
    <>
      <TextInput
        placeholder="username"
        onChange={(event) => setUsername(event.currentTarget.value)}
      ></TextInput>
      <Space h="10px" />
      <Stack>
        <Button disabled={nextBtnDisabled()} onClick={nextBtnOnClick}>
          Next
        </Button>
      </Stack>
    </>
  );
}

function GameIdTab({ backTab }: { backTab: () => void }) {
  return (
    <>
      <TextInput placeholder="Game ID"></TextInput>
      <Space h="10px" />
      <Group grow>
        <Button color="red" onClick={() => backTab()}>
          Back
        </Button>
        <Button>Create</Button>
      </Group>
    </>
  );
}

function NewGameTab({ backTab }: { backTab: () => void }) {
  return (
    <>
      <Group grow>
        <Paper withBorder p="sm">
          {/* <Center>
            <Text
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              sx={{ fontFamily: "Greycliff CF, sans-serif" }}
              ta="center"
              fz="xl"
              fw={700}
            >
              103
            </Text>
          </Center> */}
          <Group>
            <Button>Create</Button>
          </Group>
        </Paper>
      </Group>
      <Space h="10px" />

      <Group grow>
        <Button color="red" onClick={() => backTab()}>
          Back
        </Button>
      </Group>
    </>
  );
}

function JoinGameTab() {
  const homeConfix = useGameHomeConfix();
  const [activeTab, setActiveTab] = useState("1");

  return (
    <>
      <Tabs value={activeTab} orientation="vertical">
        <Tabs.List grow>
          <Tabs.Tab value="1" disabled={homeConfix.username != null}>
            Username
          </Tabs.Tab>
          <Tabs.Tab value="2" disabled={homeConfix.username == null}>
            Game ID
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="1">
          <Paper p="lg">
            <UsernameTab nextTab={() => setActiveTab("2")} target="join" />
          </Paper>
        </Tabs.Panel>
        <Tabs.Panel value="2">
          <Paper p="lg">
            <GameIdTab
              backTab={() => {
                homeConfix.setUsername(null);
                homeConfix.setSelection(null);
                setActiveTab("1");
              }}
            />
          </Paper>
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

function HostGameTab() {
  const homeConfix = useGameHomeConfix();
  const [activeTab, setActiveTab] = useState("1");

  return (
    <>
      <Tabs value={activeTab} orientation="vertical">
        <Tabs.List grow>
          <Tabs.Tab value="1" disabled={homeConfix.username != null}>
            Username
          </Tabs.Tab>
          <Tabs.Tab value="2" disabled={homeConfix.username == null}>
            New Game
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="1">
          <Paper p="lg">
            <UsernameTab nextTab={() => setActiveTab("2")} target="host" />
          </Paper>
        </Tabs.Panel>
        <Tabs.Panel value="2">
          <Paper p="lg">
            <NewGameTab
              backTab={() => {
                homeConfix.setUsername(null);
                homeConfix.setSelection(null);
                setActiveTab("1");
              }}
            />
          </Paper>
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

export default function Home() {
  const homeConfix = useGameHomeConfix();

  const joinTabDisabled = () => {
    if (homeConfix.selection == null) return false;
    return homeConfix.selection != "join";
  };

  const hostTabDisabled = () => {
    if (homeConfix.selection == null) return false;
    return homeConfix.selection != "host";
  };

  return (
    <Flex
      justify="center"
      align="center"
      sx={{
        height: "100vh",
      }}
    >
      <Paper shadow="xs" p="md" withBorder>
        <Tabs defaultValue="join">
          <Tabs.List>
            <Tabs.Tab value="join" disabled={joinTabDisabled()}>
              Join Game
            </Tabs.Tab>
            <Tabs.Tab value="host" disabled={hostTabDisabled()}>
              Host Game
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="join">
            <Paper p="md">
              <JoinGameTab />
            </Paper>
          </Tabs.Panel>
          <Tabs.Panel value="host">
            <Paper p="md">
              <HostGameTab />
            </Paper>
          </Tabs.Panel>
        </Tabs>
      </Paper>
    </Flex>
  );
}
