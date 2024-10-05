import { Type } from '.'
import VariableButton from '@/components/VariableButton'

export default function LinkButton({ block }: any) {
  return (
    <>
      {block.link.map((data, index) => (
        <VariableButton key={index} data={data}></VariableButton>
      ))}
    </>
  )
}
