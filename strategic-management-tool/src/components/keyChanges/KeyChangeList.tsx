import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { NavLinksProps } from "../../models/NavLinks";
import * as Tooltip from "@radix-ui/react-tooltip";
import {useDispatch} from "react-redux";
import {keyChangeActions} from "../../_store/keychanges.slice";
import {issueActions} from "../../_store/issues.slice";
import {riskActions} from "../../_store/risks.slice";
import React from "react";
import {objectiveActions} from "../../_store/objectives.slice";
import {stakeholderActions} from "../../_store/stakeholders.slice";
import {departmentActions} from "../../_store/department.slice";
import {keyChangeDepartmentActions} from "../../_store/keyChangeDepartment.slice";
import {keyImpactActions} from "../../_store/keyImpact.slice";
import {riskRatingActions} from "../../_store/riskRating.slice";
import {riskLeverActions} from "../../_store/riskLever.slice";
import {riskObstacleActions} from "../../_store/riskObstacle.slice";
import {keyChangePrioritisationActions} from "../../_store/keychangePrioritisation.slice";
interface KeyChangeListProps {
  data: NavLinksProps[];
  text?: string;
}

const KeyChangeList: React.FC<KeyChangeListProps> = ({ data, text }) => {
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState(location.pathname);
  const dispatch = useDispatch()

  const handleActiveRoute = (route: string) => {
    setActiveRoute(route);
  };

  const handleKeyChangeItem = (id: string, route:string) => {
    dispatch(keyChangeActions.getKeyChangeById({id}));

    if (route?.includes("issueregister")) {
      dispatch(issueActions.getAll({key_change_id: id}))
    }

    if (route?.includes("riskregister")){
      dispatch(riskActions.getAll({key_change_id: id}))
    }

    if (route?.includes("risks")){
      console.log("Risks from key change list", route)
      dispatch(riskRatingActions.getRiskRatingByKeyId({key_change_id: id}))
      dispatch(riskLeverActions.getRiskLeverByKeyId({key_change_id: id}))
      dispatch(riskObstacleActions.getRiskObstacleByKeyId({key_change_id: id}))
    }

    if (route?.includes("priority")){
      console.log("Risks from key change list", route)
      dispatch(keyChangePrioritisationActions.getKeyChangePrioritisationByKeyId({key_change_id: id}))
    }

    if (route?.includes("objectives")){
      dispatch(objectiveActions.getObjectiveByKeyChangeId({id}))
    }

    if (route?.includes("key-impacts")){
      dispatch(keyImpactActions.getKeyImpactByKeyId({id}))
    }

    if (route?.includes("stakeholders")){
      dispatch(stakeholderActions.getStakeholdersByKeyChangeId({id}))
    }
  }

  const isActive = (route: string) => {
    return activeRoute === route;
  };

  return (
    <div className="h-full space-y-5 px-6 overflow-y-auto py-4 max-h-[900px] scrollbar-thin scrollbar-thumb-zinc-200">
      {data?.map(({ id, title, image, route }) => (
        <div key={id}>
          <ul>
            <li>
              <Link
                className={`flex space-x-4 px-4 py-4 text-[14px]  ${
                  isActive(route)
                    ? "bg-primary-50 font-medium rounded-xl text-primary-500"
                    : ""
                }`}
                to={route}
                onClick={() => {
                  handleKeyChangeItem(id, route)
                  handleActiveRoute(route)}
                }
              >
                <img src={image} alt="" />
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <h1>{title}</h1>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content sideOffset={5}>
                        "{text}"
                        <Tooltip.Arrow />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </Link>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default KeyChangeList;
