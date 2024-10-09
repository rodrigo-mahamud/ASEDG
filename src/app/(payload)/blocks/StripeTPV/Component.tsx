import Container from '@/components/Container'
import StripeCard from './StripeCard'
import StripeModal from './StripeModal'

export default function StripePaymentComponent({
  stripeInfo,
  cardIncluded,
  cardDescription,
  cardTitle,
  buttonText,
  icon,
}: any) {
  const currentDate = new Date()
  const isExpired = new Date(stripeInfo.expirationDate) < currentDate

  return (
    <Container>
      {isExpired ? ' ' : <StripeModal stripeInfo={stripeInfo} />}
      <StripeCard
        cardTitle={cardTitle}
        price={stripeInfo.price}
        cardDescription={cardDescription}
        cardIncluded={cardIncluded}
        buttonText={buttonText}
        icon={icon}
        isExpired={isExpired}
      />
    </Container>
  )
}
