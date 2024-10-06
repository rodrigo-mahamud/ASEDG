import { Type } from '.'
import VariableButton from '@/components/VariableButton'

export default function LinkButton({ block }: Type) {
  return (
    <>
      {block.link.map((data, index) => (
        <VariableButton key={index} data={data}></VariableButton>
      ))}
    </>
  )
}
