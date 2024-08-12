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
  Link,
  Img,
} from '@react-email/components'

export default function BookingConfirmationEmail({
  nombre,
  apellidos,
  email,
  telefono,
  fechaInicio,
  fechaFin,
  pinCode,
}: any) {
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
                  ¡Muchas Gracias, {nombre}!
                </Heading>
                <Text className="text-base leading-6 mt-4">
                  Tu reserva del gimnasio municipal ha sido realizada correctamente. Con el
                  siguiente código, tendrás acceso al gimnasio las 24 horas del día, los 7 días de
                  la semana, hasta el
                  {fechaFin}.
                </Text>
                <Text className="bg-[#f0f3f7] text-center rounded py-7 text-3xl tracking-[6px] font-semibold my-6">
                  {pinCode}
                </Text>
                <Text className="text-base leading-6 mb-0.5">
                  <b>Información de tu reserva:</b>
                </Text>
                <Section className="ml-3 text-sm leading-6 mb-4">
                  <Row>
                    <Column></Column>
                  </Row>
                  <Row>
                    <Column>Nombre: {nombre}</Column>
                  </Row>
                  <Row>
                    <Column>Apellidos: {apellidos}</Column>
                  </Row>
                  <Row>
                    <Column>Email de contacto: {email}</Column>
                  </Row>
                  <Row>
                    <Column>Teléfono de contacto: {telefono}</Column>
                  </Row>
                  <Row>
                    <Column> Fecha de inicio: {fechaInicio}</Column>
                  </Row>
                  <Row>
                    <Column> Fecha de fin: {fechaFin}</Column>
                  </Row>
                </Section>
                <Text>
                  Muchas gracias por tu reserva. Si tienes alguna duda, puedes consultarla en el
                  gimnasio municipal de lunes a viernes de 9:00 a 13:00 y de 16:00 a 20:00, o
                  llamando al Ayuntamiento de San Esteban de Gormaz al 975 35 00 02.
                </Text>
                <Text className="text-xs leading-5 mt-4 opacity-50">
                  Te recordamos que, al realizar esta reserva, has aceptado de manera explícita los
                  términos y condiciones establecidos. El cumplimiento de estos términos es
                  obligatorio y fundamental para mantener tu acceso al gimnasio. En caso de
                  cualquier incumplimiento, nos reservamos el derecho de cancelar tu reserva de
                  forma inmediata y sin posibilidad de reembolso. Es tu responsabilidad
                  familiarizarte con todas las normas y directrices. Puedes consultar los términos y
                  condiciones detallados <Link href="https://example.com">aquí.</Link>.
                </Text>
              </Section>
            </Column>
          </Row>
        </Body>
      </Html>
    </Tailwind>
  )
}
