import {
  Html,
  Head,
  Body,
  Tailwind,
  Section,
  Text,
  Heading,
  Row,
  Column,
  Img,
} from '@react-email/components'

export default function PinCodeChangedEmail({ nombre, pinCode }: any) {
  return (
    <Tailwind>
      <Html className="h-full">
        <Head />
        <Body className="bg-[#f6f9fc] bg-transparent py-13 h-full font-sans">
          <Row>
            <Column>
              <Img
                className="flex items-center mx-auto mb-10 w-56"
                src="https://www.sanestebandegormaz.org/images/escudo-ayuntamiento.png"
                alt="Logo ayuntamiento san esteban de gormaz"
              />
            </Column>
          </Row>
          <Row className="max-w-[37rem] mx-auto">
            <Column className="bg-white py-8 border border-[#ddd] rounded-xl shadow-lg">
              <Section className="px-12">
                <Heading className="mt-0" as="h1">
                  {nombre}, tu código de acceso se ha cambiado correctamente.
                </Heading>
                <Text className="text-base leading-6 mt-4">
                  Tu reserva del gimnasio municipal ha sido realizada correctamente. Con el
                  siguiente código, tendrás acceso al gimnasio las 24 horas del día, los 7 días de
                  la semana, hasta el
                </Text>
                <Text className="bg-[#f0f3f7] text-center rounded py-7 text-3xl tracking-[6px] font-semibold my-6">
                  {pinCode}
                </Text>
                <Text className="text-base leading-6 mb-0.5">
                  drfgojhdfgj asdfgokfdgjn adfv oisdafgv ojhsv jsfdsfd
                </Text>
              </Section>
            </Column>
          </Row>
        </Body>
      </Html>
    </Tailwind>
  )
}
