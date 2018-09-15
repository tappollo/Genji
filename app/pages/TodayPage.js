import RepoCard from "../components/RepoCard";
import React from "react";
import { FlatList } from "react-native";

const TodayPage = () => (
  <FlatList renderItem={({ item }) => <RepoCard />} data={[]} />
);

TodayPage.navigationOptions = {
  title: "Today"
};

export default TodayPage;
