import type { Metadata } from "next";
import { ArrowButton } from "@/components/ArrowButton";
import { ContactLanes } from "@/components/contact/ContactLanes";
import { ContactMessage } from "@/components/contact/ContactMessage";
import { StoreLocator } from "@/components/contact/StoreLocator";
import { PageHero } from "@/components/page/PageHero";
import content from "@/content/contact.json";

export const metadata: Metadata = {
  title: "Contact — Mode 7",
  description:
    "Sales, support, or a trade-in valuation — pick a lane or send us a message. Seven can also help right now.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        overline={content.hero.overline}
        title={<>Let’s get you to the right&nbsp;team.</>}
        intro={content.hero.intro}
        actions={
          <>
            <ArrowButton label="Message Seven" variant="fill" />
            <ArrowButton label="Find a Store" variant="outline" />
          </>
        }
      />

      <ContactLanes />
      <ContactMessage />
      <StoreLocator />
    </>
  );
}
