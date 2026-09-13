import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { ShopBrowse } from "@/components/shop/ShopBrowse";

export const metadata: Metadata = {
  title: "Shop — Mode 7",
  description:
    "Phones, laptops, smart-home kit, solar and certified refurbished — every unit vetted, sealed and guaranteed.",
};

export default function ShopPage() {
  return (
    <>
      <PageHero
        overline="Shop"
        title={<>Premium technology, ready to&nbsp;ship.</>}
        intro="Phones, laptops, smart-home kit, solar and certified refurbished — every unit vetted, sealed and guaranteed."
      />

      <ShopBrowse />
    </>
  );
}
