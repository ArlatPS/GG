import BestDeals from "@/app/bestDeals";
import HeaderWithEffect from "@/components/root/headerWithEffect";
import { MainFlex } from "@/style/flexMain";

// due to current lack of support from TS for server component that is async
// it has to be casted as any to compile
const BestDealsAny = BestDeals as any;
export default function Home() {
  return (
    <MainFlex>
      <HeaderWithEffect text="Games Done Cheap" />
      <BestDealsAny />
    </MainFlex>
  );
}
