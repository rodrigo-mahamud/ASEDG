import * as React from 'react'
import { Html, Head, Body, Container, Section, Text } from '@react-email/components'

export function BookingConfirmationEmail({
  nombre,
  apellidos,
  email,
  telefono,
  fechaInicio,
  fechaFin,
  pinCode,
}: any) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Text style={heading}>Registro Completado</Text>
            <Text style={paragraph}>
              ¡Bienvenido, {nombre} {apellidos}!
            </Text>
            <Text style={paragraph}>
              Tu registro en nuestro gimnasio ha sido exitoso. Aquí están los detalles de tu
              reserva:
            </Text>
            <Text style={paragraph}>
              Email: {email}
              <br />
              Teléfono: {telefono}
              <br />
              Fecha de inicio: {fechaInicio}
              <br />
              Fecha de fin: {fechaFin}
            </Text>
            <Text style={paragraph}>Tu código PIN para acceder al gimnasio es:</Text>
            <Section style={codeBox}>
              <Text>{pinCode}</Text>
            </Section>
            <Text style={paragraph}>
              Por favor, guarda este código. Lo necesitarás para acceder a nuestras instalaciones.
            </Text>
            <Text style={paragraph}>
              Si no has realizado este registro, por favor ignora este mensaje y contáctanos
              inmediatamente.
            </Text>
            <Text style={paragraph}>¡Gracias por unirte a nuestro gimnasio!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const box = {
  padding: '0 48px',
}

const heading = {
  fontSize: '32px',
  fontWeight: 'bold',
  marginTop: '48px',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '24px',
  marginTop: '16px',
}

const codeBox = {
  backgroundColor: '#f4f4f4',
  borderRadius: '4px',
  padding: '16px',
  marginTop: '16px',
}

const code = {
  fontFamily: 'monospace',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center',
}
