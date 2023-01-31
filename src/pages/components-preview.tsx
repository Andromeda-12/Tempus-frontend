import React, { ReactNode } from 'react'
import {
  Button,
  Card,
  Checkbox,
  Divider,
  Input,
  OldInput,
  Progress,
  Spinner,
  Switch,
  Tooltip
} from '@/shared/ui'
import Image from 'next/image'
import image from '../../public/photo.jpg'
import clsx from 'clsx'
import { Typewriter } from '@/shared/ui/Typewriter'
import { Provider } from 'effector-react'
import { fork } from 'effector'
import { notificationModel } from '@/entities/notification'
import { Header } from '@/widgets/header'
import { FileUpload, UploadAvatar } from '@/entities/file-upload'
import AvatarEditor from '@/entities/file-upload/ui/edit'

interface ComponentsPreview {}

const Component = ({
  children,
  className,
  title
}: {
  children: ReactNode
  title: string
  className?: string
}) => (
  <div
    className={clsx('flex flex-col items-center gap-2 text-center', className)}
  >
    <p className='text-primary-hover bg-primary/5 mb-2'>{title}</p>
    {children}
  </div>
)

const Row = ({ children }: { children: ReactNode }) => (
  <div className='mb-7 w-full flex align-top justify-center gap-5 '>{children}</div>
)

const Section = ({
  children,
  title
}: {
  children: ReactNode
  title: string
}) => (
  <div className='w-full'>
    <div className='text-center'>
      <h1 className='px-3 py-1 text-lg font-medium text-primary bg-primary/5'>
        {title}
      </h1>
    </div>

    <div className='py-14'>{children}</div>
    {/* <Divider className='mb-10 mt-10' /> */}
    {/* <div className='bg-primary/5 h-7'></div> */}
  </div>
)

export const ComponentsPreview = (props: ComponentsPreview) => {
  const showNotification = () => {
    notificationModel.addNotification({
      id: 'test1',
      message: 'test',
      title: 'title',
      type: 'info'
    })
  }

  return (
    <>
      <Section title='Button'>
        <Row>
          <Component title='contained'>
            <Button>Button</Button>
          </Component>

          <Component title='outline'>
            <Button variant='outline'>Button</Button>
          </Component>

          <Component title='text'>
            <Button variant='text'>Button</Button>
          </Component>
        </Row>

        <Row>
          <Component title='with start icon'>
            <Button
              startIcon={
                <svg
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z'></path>
                </svg>
              }
            >
              Button
            </Button>
          </Component>

          <Component title='outline'>
            <Button
              variant='outline'
              startIcon={
                <svg
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z'></path>
                </svg>
              }
            >
              Button
            </Button>
          </Component>

          <Component title='text'>
            <Button
              variant='text'
              startIcon={
                <svg
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z'></path>
                </svg>
              }
            >
              Button
            </Button>
          </Component>
        </Row>

        <Row>
          <Component title='contained'>
            <Button
              endIcon={
                <svg
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              }
            >
              Button
            </Button>
          </Component>

          <Component title='outline'>
            <Button
              variant='outline'
              endIcon={
                <svg
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              }
            >
              Button
            </Button>
          </Component>

          <Component title='text'>
            <Button
              variant='text'
              endIcon={
                <svg
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              }
            >
              Button
            </Button>
          </Component>
        </Row>

        <Row>
          <Component title='contained glow'>
            <Button variant='contained' withGlow>
              Button
            </Button>
          </Component>

          <Component title='outlined glow'>
            <Button variant='outline' withGlow>
              Button
            </Button>
          </Component>

          <Component title='text glow'>
            <Button variant='text' withGlow>
              Button
            </Button>
          </Component>
        </Row>

        <Row>
          <Component title='disabled'>
            <Button disabled>Button</Button>
          </Component>

          <Component title='loading'>
            <Button loading>Button</Button>
          </Component>
        </Row>
      </Section>

      <Section title='Spinner'>
        <Row>
          <Component title='spinner'>
            <Spinner />
          </Component>

          <Component title='spinner with size'>
            <Spinner className='w-10 h-10' />
          </Component>

          <Component title='spinner with size and width'>
            <Spinner className='w-10 h-10 border-[5px]' />
          </Component>
        </Row>

        <Row>
          <Component title='spinner'>
            <Spinner />
          </Component>

          <Component title='spinner with size'>
            <Spinner className='w-10 h-10' />
          </Component>

          <Component title='spinner with size and width'>
            <Spinner className='w-10 h-10 border-[5px]' />
          </Component>
        </Row>
      </Section>

      <Section title='Card'>
        <Row>
          <Component title='Сard'>
            <Card className='w-[320px]'>
              <div className='px-3 py-4'>
                <h2 className='text-center text-lg mb-1'>Some header</h2>
                <p className='text-justify'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Magnam eligendi suscipit ipsum, nesciunt asperiores voluptates
                  aspernatur animi recusandae odio id...
                </p>
                <Button className='mt-3'>Read more</Button>
              </div>
            </Card>
          </Component>

          <Component title='Сard with image'>
            <Card className='w-[350px]'>
              <div className='h-[330px] overflow-hidden'>
                <Image placeholder='blur' alt='test' src={image}></Image>
              </div>

              <div className='px-2 py-3 mb-1'>
                <h2 className='text-center text-lg'>Andromeda</h2>
                <h3 className='text-center text-md'>
                  Brilliant front-end developer from Siberia ❄️
                </h3>
                <p className='text-sm'>Very funny and very lovely</p>

                <div className='flex '>
                  <Button
                    type='icon'
                    variant='text'
                    rounded='rounded-full'
                    className='rounded-full'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                      />
                    </svg>
                  </Button>

                  <Button type='icon' variant='text' rounded='rounded-full'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z'
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            </Card>
          </Component>
        </Row>
      </Section>

      <Section title='Switch'>
        <Row>
          <Component title='switch'>
            <Switch />
          </Component>

          <Component title='switch checked'>
            <Switch checked />
          </Component>

          <Component title='switch disabled'>
            <Switch disabled />
          </Component>

          <Component title='switch disabled checked'>
            <Switch checked disabled />
          </Component>

          <Component title='switch with label'>
            <Switch name='switch' label='Lorem, ipsum dolor.' />
          </Component>
        </Row>
      </Section>

      <Section title='Checkbox'>
        <Row>
          <Component title='checkbox'>
            <Checkbox />
          </Component>

          <Component title='checkbox disabled'>
            <Checkbox disabled />
          </Component>

          <Component title='checkbox checked disabled'>
            <Checkbox checked disabled />
          </Component>

          <Component title='checkbox'>
            <Checkbox name='checkbox' label='Accept terms and conditions' />
          </Component>
        </Row>
      </Section>

      <Section title='Progress bar'>
        <Row>
          <Component title='progress' className='w-[200px]'>
            <Progress value={40} />
          </Component>

          <Component title='progress not rounded' className='w-[200px]'>
            <Progress value={40} rounded={false} />
          </Component>

          <Component title='progress with custom color' className='w-[200px]'>
            <Progress
              value={40}
              rounded={false}
              color='bg-slate-700'
              indicatorColor='bg-purple-700'
            />
          </Component>
        </Row>
      </Section>

      <Section title='upload file'>
          <Row>
            <Component title='upload file'>
              {/* <FileUpload /> */}
              <UploadAvatar />
            </Component>
          </Row>
      </Section>

      {/* <Section title='Tooltip'>
        <Row>
          <Component title='tooltip'>
            <Tooltip text='OMG THIS IS SO COOL TOOLTIP'>
              <Button>Button with tooltip</Button>
            </Tooltip>
          </Component>

          <Component title='tooltip right side'>
            <Tooltip text='OMG THIS IS SO COOL TOOLTIP' side='right'>
              <Button>Button with right tooltip</Button>
            </Tooltip>
          </Component>
        </Row>
      </Section> */}

      {/* <Section title='Input'>
        <Row>
          <Component title='standart'>
            <Input />
          </Component>

          <Component title='outlined'>
            <Input variant='outlined' />
          </Component>

          <Component title='standart disabled'>
            <Input disabled />
          </Component>

          <Component title='outlined disabled'>
            <Input variant='outlined' disabled />
          </Component>
        </Row>

        <Row>
          <Component title='standart filled'>
            <Input filled />
          </Component>

          <Component title='outlined filled'>
            <Input variant='outlined' filled />
          </Component>

          <Component title='standart disabled filled'>
            <Input disabled filled />
          </Component>

          <Component title='outlined disabled filled'>
            <Input variant='outlined' disabled filled />
          </Component>
        </Row>

        <Row>
          <Component title='standart label'>
            <Input label='Standart' />
          </Component>

          <Component title='outlined label'>
            <Input variant='outlined' label='Outlined' />
          </Component>

          <Component title='outlined label disabled'>
            <Input label='disabled' disabled />
          </Component>

          <Component title='input outlined disabled'>
            <Input variant='outlined' label='disabled' disabled />
          </Component>
        </Row>

        <Row>
          <Component title='standart with placeholder'>
            <Input placeholder='test' />
          </Component>

          <Component title='outlined with placeholder'>
            <Input variant='outlined' placeholder='test' />
          </Component>

          <Component title='standart placeholder disabled'>
            <Input disabled placeholder='test' />
          </Component>

          <Component title='outlined placeholder disabled'>
            <Input variant='outlined' disabled placeholder='test' />
          </Component>
        </Row>

        <Row>
          <Component title='standart label with placeholder'>
            <Input label='Standart' placeholder='test' />
          </Component>

          <Component title='outlined label with placeholder'>
            <Input variant='outlined' label='Outlined' placeholder='test' />
          </Component>

          <Component title='outlined label placeholder disabled'>
            <Input label='disabled' disabled placeholder='test' />
          </Component>

          <Component title='input outlined placeholder disabled'>
            <Input
              variant='outlined'
              label='disabled'
              disabled
              placeholder='test'
            />
          </Component>
        </Row>

        <Row>
          <Component title='standart'>
            <Input label='Standart' helperText='some text' />
          </Component>

          <Component title='outlined'>
            <Input variant='outlined' label='Outlined' helperText='some text' />
          </Component>

          <Component title='outlined'>
            <Input label='disabled' disabled helperText='some text' />
          </Component>

          <Component title='input outlined'>
            <Input
              variant='outlined'
              label='disabled'
              disabled
              helperText='some text'
            />
          </Component>
        </Row>

        <Row>
          <Component title='standart with helper text'>
            <Input label='Standart' error helperText='some text' />
          </Component>

          <Component title='outlined with helper text'>
            <Input
              variant='outlined'
              label='Outlined'
              error
              helperText='some text'
            />
          </Component>

          <Component title='standart disabled with helper text'>
            <Input label='disabled' disabled error helperText='some text' />
          </Component>

          <Component title='outlined disabled with helper text'>
            <Input
              variant='outlined'
              label='disabled'
              disabled
              error
              helperText='some text'
            />
          </Component>
        </Row>

        <Row>
          <Component title='standart filled with helper text'>
            <Input label='Standart' filled error helperText='some text' />
          </Component>

          <Component title='outlined with helper text'>
            <Input
              variant='outlined'
              label='Outlined'
              error
              helperText='some text'
            />
          </Component>

          <Component title='standart disabled with helper text'>
            <Input label='disabled' disabled error helperText='some text' />
          </Component>

          <Component title='outlined disabled with helper text'>
            <Input
              variant='outlined'
              label='disabled'
              disabled
              error
              helperText='some text'
            />
          </Component>
        </Row>
      </Section> */}

      {/* <Section title='Input'>
        <Row>
          <Component title='standard'>
            <Input />
          </Component>

          <Component title='outlined'>
            <Input variant='outlined' />
          </Component>

          <Component title='filled'>
            <Input variant='filled' />
          </Component>
        </Row>

        <Row>
          <Component title='standard'>
            <Input />
          </Component>

          <Component title='standard label'>
            <Input label='Standard' />
          </Component>

          <Component title='label placeholder'>
            <Input label='Label' placeholder='placeholder' />
          </Component>

          <Component title='standard disabled'>
            <Input label='Label' disabled />
          </Component>

          <Component title='disabled with value'>
            <Input label='Label' value='test' disabled />
          </Component>

          <Component title='standard error'>
            <Input error />
          </Component>

          <Component title='standard error label'>
            <Input label='Label' error />
          </Component>
        </Row>

        <Row>
          <Component title='outlined'>
            <Input variant='outlined' />
          </Component>

          <Component title='outlined label'>
            <Input variant='outlined' label='Label' />
          </Component>

          <Component title='label placeholder'>
            <Input variant='outlined' label='Label' placeholder='placeholder' />
          </Component>

          <Component title='outlined disabled'>
            <Input variant='outlined' label='Label' disabled />
          </Component>

          <Component title='disabled with value'>
            <Input variant='outlined' label='Label' value='test' disabled />
          </Component>

          <Component title='outlined error'>
            <Input variant='outlined' error />
          </Component>

          <Component title='outlined error label'>
            <Input variant='outlined' label='Label' error />
          </Component>
        </Row>

        <Row>
          <Component title='filled'>
            <Input variant='filled' />
          </Component>

          <Component title='filled label'>
            <Input variant='filled' label='Label' />
          </Component>

          <Component title='label placeholder'>
            <Input variant='filled' label='Label' placeholder='placeholder' />
          </Component>

          <Component title='filled label disabled'>
            <Input variant='filled' label='Label' disabled />
          </Component>

          <Component title='disabled with value'>
            <Input variant='filled' label='Label' value='test' disabled />
          </Component>

          <Component title='filled error'>
            <Input variant='filled' error />
          </Component>

          <Component title='filled error label'>
            <Input variant='filled' label='Label' error />
          </Component>
        </Row>

        <Row>
          <Component title='standart with helper text'>
            <Input label='With helper text' helperText='some text helps you' />
          </Component>

          <Component title='outlined with helper text'>
            <Input
              variant='outlined'
              label='With helper text'
              helperText='some text helps you'
            />
          </Component>

          <Component title='filled with helper text'>
            <Input
              variant='filled'
              label='With helper text'
              helperText='some text helps you'
            />
          </Component>

          <Component title='error helper text'>
            <Input
              variant='standard'
              label='With helper text'
              helperText='some text helps you'
              error
            />
          </Component>
        </Row>

        <Row>
          <Component title='standart with helper text'>
            <Input label='With helper text' password />
          </Component>

          <Component title='standart with helper text'>
            <Input variant='outlined' password label='With helper text' />
          </Component>
        </Row>
      </Section> */}

      {/* <Section title='Typewriter'>
        <Row>
          <Component title='Typewriter'>
            <Typewriter words={['Test', 'this', 'shit']} />
          </Component>

          <Component title='Infinity Typewriter'>
            <Provider value={fork()}>
              <Typewriter words={['Test', 'this', 'shit']} loop={true} />
            </Provider>
          </Component>

          <Component title='Typewriter with custom speed'>
            <Provider value={fork()}>
              <Typewriter
                words={['Soooo', 'laargeeee', 'woooorrrdssss']}
                deleteSpeed={200}
                typeSpeed={300}
                loop={true}
              />
            </Provider>
          </Component>
        </Row>
      </Section> */}
      {/* 
      <Section title='Notifications'>
        <Row>
          <Component title='notification'>
            <Button onClick={showNotification}>Show</Button>
          </Component>
        </Row>
      </Section>
{/* 
      <Section title='Header'>
        <Row>
          <Component title='notification' className='w-full'>
            <Header />
          </Component>
        </Row>
      </Section> */}
    </>
  )
}
