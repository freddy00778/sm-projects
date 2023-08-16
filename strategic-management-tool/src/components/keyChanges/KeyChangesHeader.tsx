import { NavLink } from "react-router-dom";
import { NavLinksProps } from "../../models/NavLinks";
import * as Tabs from "@radix-ui/react-tabs";
import "tailwindcss/tailwind.css";
import { useState } from "react";

interface KeyChangesLinkProps {
  id: string;
  title: string;
  route: string;
  activeTab: string;
  setActiveTab: (id: string) => void;
}

interface TabComponentProps {
  routes: NavLinksProps[];
}

const KeyChangesLink: React.FC<KeyChangesLinkProps> = ({
  id,
  title,
  route,
  activeTab,
  setActiveTab,
}) => {
  const selectedClass = activeTab === id ? "border-b-2 border-primary-500" : "";
  return (
    <Tabs.Trigger
      value={id}
      className={`mx-2 ${selectedClass}`}
      onClick={() => setActiveTab(id)}
    >
      <NavLink to={route}>{title}</NavLink>
    </Tabs.Trigger>
  );
};

const KeyChangesHeader: React.FC<TabComponentProps> = ({ routes }) => {
  const [activeTab, setActiveTab] = useState(routes[0]?.id);
  return (
    <Tabs.Root
      defaultValue={activeTab}
      className="flex items-center h-full py-6 border-b border-b-border border-opacity-20"
    >
      <Tabs.List className="flex p-4  space-x-12 px-8">
        {routes.map(({ id, title, route }) => (
          <KeyChangesLink
            key={id}
            id={id}
            route={route}
            title={title}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
};

export default KeyChangesHeader;
