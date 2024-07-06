import * as React from 'react'
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Preview,
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
    <Html style={htmlStyle}>
      <Head />
      <Body style={main}>
        <Row>
          <Column>
            <Img
              style={img}
              src="https://www.sanestebandegormaz.org/images/escudo-ayuntamiento.png"
              alt="Logo ayuntamiento san esteban de gormaz"
            />
          </Column>
        </Row>
        <Row style={row}>
          <Column style={container}>
            <Section style={box}>
              <Heading style={head} as="h1">
                ¡Muchas Gracias, {nombre}!
              </Heading>
              <Text style={paragraph}>
                Tu reserva del gimnasio municipal ha sido realizada correctamente. Con el siguiente
                código, tendrás acceso al gimnasio las 24 horas del día, los 7 días de la semana,
                hasta el
                {fechaFin}.
              </Text>
              <Text style={code}>{pinCode}</Text>
              <Text style={infoT}>
                <b>Información de tu reserva:</b>
              </Text>
              <Section style={info}>
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
                gimnasio municipal de lunes a viernes de 9:00 a 13:00 y de 16:00 a 20:00, o llamando
                al Ayuntamiento de San Esteban de Gormaz al 975 35 00 02.
              </Text>
              <Text style={terms}>
                Te recordamos que, al realizar esta reserva, has aceptado de manera explícita los
                términos y condiciones establecidos. El cumplimiento de estos términos es
                obligatorio y fundamental para mantener tu acceso al gimnasio. En caso de cualquier
                incumplimiento, nos reservamos el derecho de cancelar tu reserva de forma inmediata
                y sin posibilidad de reembolso. Es tu responsabilidad familiarizarte con todas las
                normas y directrices. Puedes consultar los términos y condiciones detallados{' '}
                <Link href="https://example.com">aquí.</Link>.
              </Text>
            </Section>
          </Column>
        </Row>
      </Body>
    </Html>
  )
}
const img = {
  display: 'flex',
  alignItems: 'center',
  margin: '0 auto 2.5rem auto',
  width: '14rem',
}
const head = {
  marginTop: '0',
}
const infoT = {
  fontSize: '16px',
  lineHeight: '24px',
  marginBottom: '2px',
}
const info = {
  margin: '0 0 0 0.75rem',
  fontSize: '0.85rem',
  lineHeight: '1.5',
  marginBottom: '16px',
}
const terms = {
  fontSize: '11px',
  lineHeight: '20px',
  margin: '16px 0px 0px 0px',
  opacity: '0.5',
}
const htmlStyle = {
  height: '100%',
}
const main = {
  backgroundColor: '#f6f9fc',
  padding: '3.25rem 0',
  height: '100%',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}
const row = {
  maxWidth: '37rem',
  margin: '0 auto',
}
const container = {
  backgroundColor: '#ffffff',
  padding: '2rem 0 2rem',
  border: '1px solid rgb(221, 221, 221)',
  borderRadius: '12px',
  boxShadow: 'rgba(0, 0, 0, 0.12) 0px 6px 16px',
}

const box = {
  padding: '0 48px',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '24px',
  marginTop: '16px',
}

const code = {
  backgroundColor: '#f0f3f7',
  textAlign: 'center',
  borderRadius: '4px',
  padding: '1.75rem 0',
  fontSize: '2rem',
  letterSpacing: '6px',
  fontWeight: '600',
  margin: '1.5rem 0',
} as any
