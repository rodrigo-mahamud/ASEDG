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
  id,
}: any) {
  const currentDate = new Date()
  const isExpired = new Date(stripeInfo.expirationDate) < currentDate
  console.log(id)

  return (
    <Container>
      {isExpired ? ' ' : <StripeModal stripeInfo={stripeInfo} blockId={id} />}
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