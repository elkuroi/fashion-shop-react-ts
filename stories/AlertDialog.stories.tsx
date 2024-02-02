import { DialogTrigger } from 'react-aria-components'
import type { Meta } from '@storybook/react'

import { AlertDialog } from '@/components/ui-common/AlertDialog'
import { Button } from '@/components/ui-common/Button'
import { Modal } from '@/components/ui-common/Modal'

const meta: Meta<typeof AlertDialog> = {
  component: AlertDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

export const Example = (args: any) => (
  <DialogTrigger>
    <Button variant='secondary'>Delete…</Button>
    <Modal>
      <AlertDialog {...args} />
    </Modal>
  </DialogTrigger>
)

Example.args = {
  title: 'Delete folder',
  children:
    'Are you sure you want to delete "Documents"? All contents will be permanently destroyed.',
  variant: 'destructive',
  actionLabel: 'Delete',
}
