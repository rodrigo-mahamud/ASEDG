import * as React from 'react'
import { SelectInput } from '@payloadcms/ui/fields/Select'
import * as TablerIcons from '@tabler/icons-react'
export const Icons: React.FC<{ path: string }> = ({ path }) => {
  return (
    <div>
      <label className="field-label">Custom Select</label>
      <SelectInput path={path} name={path} options={TablerIcons} value={TablerIcons} />
    </div>
  )
}
