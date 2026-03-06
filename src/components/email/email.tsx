import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Heading,
  Preview,
  Tailwind,
} from "@react-email/components";

interface WelcomeEmailProps {
  name?: string;
}

export default function WelcomeEmail({ name = "there" }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome aboard — let&apos;s get you started</Preview>
      <Tailwind>
        <Body className="bg-neutral-100 font-sans">
          <Container className="mx-auto max-w-[600px] rounded-xl border border-solid border-neutral-200 bg-white">
            <Section className="px-10 pt-12 pb-6 text-center">
              <Heading className="m-0 text-2xl font-bold tracking-tight text-neutral-900">
                Welcome, {name} 👋
              </Heading>
              <Text className="mt-2 text-base leading-relaxed text-neutral-500">
                We&apos;re thrilled to have you on board. Your account is ready
                to go.
              </Text>
            </Section>

            <Section className="px-10 pb-8">
              <Section className="rounded-lg bg-neutral-50 p-6">
                <Text className="m-0 mb-1 text-sm font-semibold text-neutral-900">
                  Here&apos;s what you can do next:
                </Text>
                <Text className="m-0 text-sm leading-7 text-neutral-600">
                  • Complete your profile
                  <br />
                  • Explore the app
                </Text>
              </Section>
            </Section>

            <Hr className="mx-10 border-neutral-200" />

            <Section className="px-10 pb-10 pt-4 text-center">
              <Text className="m-0 text-xs leading-5 text-neutral-400">
                Need help? Just reply to this email — we&apos;re always happy to
                help.
              </Text>
              <Text className="m-0 mt-4 text-xs text-neutral-400">
                © 2026 Your Company. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
