'use client'
import { MantineProvider, Button } from '@mantine/core';

function Root({ children }: { children: React.ReactNode }) {
  return <>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      {children}
    </MantineProvider>
  </>
}

export default function Home() {
  return (
    <Root>
      <Button>
        Settings
      </Button>
    </Root>
  )
}
