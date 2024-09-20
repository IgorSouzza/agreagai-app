import { Statistics } from "./components/statistics";
import { FriendSuggestions } from "./components/friend-suggestions";
import { Friends } from "./components/friends";
import { Achievements } from "./components/achievements";
import { Hero } from "./components/hero";
import { ScrollView, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getMeService, type User } from "@/shared/services/get-me-service";
import { Info } from "./components/info";
import { Fragment } from "react";
import { Admin } from "./components/admin";

type ComponentProps = {
  statistics?: { user: User };
  achievements?: { user: User };
  friends?: {};
  'friend-suggestions'?: {};
};

const componentsMap: Record<keyof ComponentProps, (props: any) => JSX.Element> = {
  statistics: (props) => <Statistics {...props} />,
  achievements: (props) => <Achievements {...props} />,
  friends: () => <Friends />,
  'friend-suggestions': () => <FriendSuggestions />,
}

interface DynamicComponentsProps {
  keysFromApi: (keyof ComponentProps)[];
  componentProps: ComponentProps;
}

const DynamicComponents: React.FC<DynamicComponentsProps> = ({ keysFromApi, componentProps }) => {
  return (
    <>
      {keysFromApi.map((key) =>
        <Fragment key={key}>
          {componentsMap[key] ? componentsMap[key](componentProps[key] || {}) : null}
        </Fragment>
      )}
    </>
  );
};

export function HomeScreen() {
  const { data } = useQuery({ 
    queryKey: ['user-me'], 
    queryFn: getMeService 
  })

  const componentsFromApi = data?.user.home_components.map((hc) => 
    hc.active && hc.id
  ) || []

  if (!data?.user) return null
    
  return (
    <ScrollView>
      <Hero name={data?.user.name || ''} />
        <View className="p-4 pb-0">
          {!!data?.user && <Info user={data.user} />}
        </View>
        <View className="p-4 flex flex-col gap-6">
          <DynamicComponents
            keysFromApi={componentsFromApi as (keyof ComponentProps)[]} 
            componentProps={{ 
              statistics: { user: data.user },
              achievements: { user: data.user }
            }} 
          />
          <Admin />
        </View>
    </ScrollView>
  )
}