'use client';
import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { sendEmail } from '@/lib/aws/sesClient';
import { Button } from '@/components/ui/button';

type Inputs = {
  email: string;
  firstName: string;
  lastName: string;
};

interface Props {}

export default function Contact({}: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const [formClicked, setFormClicked] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setFormClicked(true);
    await sendEmail(data);
    reset();
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full"
    >
      {/* register your input into the hook by invoking the "register" function */}
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{
          required: { value: true, message: 'Email Address is required.' },
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Please input a valid email address.',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            variant="filled"
            helperText={errors.email ? errors.email.message : null}
            error={errors.email ? true : false}
            aria-invalid={errors.email ? true : false}
            placeholder="Email Address that you use to log into Spotify"
            className=" bg-slate-100 rounded-lg "
          />
        )}
      />
      <Controller
        name="firstName"
        control={control}
        rules={{ required: true }}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            variant="filled"
            helperText={errors.firstName ? 'First Name is required' : null}
            error={errors.firstName ? true : false}
            aria-invalid={errors.firstName ? true : false}
            aria-required
            placeholder="First Name"
            className=" bg-slate-100 rounded-lg"
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        rules={{ required: true }}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            aria-required
            helperText={errors.lastName ? 'Last Name is required' : null}
            error={errors.lastName ? true : false}
            aria-invalid={errors.lastName ? true : false}
            variant="filled"
            placeholder="Last Name"
            className=" bg-slate-100 rounded-lg"
          />
        )}
      />
      {/* include validation with required or other standard HTML validation rules */}

      {/* errors will return when field validation fails  */}
      {formClicked ? (
        <p className="font-bold text-green-600">
          Thank you for submitting! You will be contacted shortly.
        </p>
      ) : (
        <Button
          type="submit"
          className="border-solid border-2 hover:bg-green-600 hover:text-black"
        >
          Send us an email
        </Button>
      )}
    </form>
  );
}
