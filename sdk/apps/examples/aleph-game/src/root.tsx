// @refresh reload
import { Suspense } from 'solid-js'
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title
} from 'solid-start'
import { Toaster } from 'solid-toast'
import { Metadata } from './components/Metadate/Metadata'
import './root.css'

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Metadata />
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@400;600&display=swap');
        </style>
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <Toaster />
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  )
}
