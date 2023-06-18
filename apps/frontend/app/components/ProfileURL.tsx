'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { toast } from '~/components/ui/use-toast';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

const ProfileURL = () => {
  const [URL, setURL] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  // const a = useQuery(['profileURL'], () => {});

  const userId = session?.user.id;
  // console.log(session, 'profileURL');

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };
  return (
    <div className="flex flex-col">
      {/* {isEditMode ? (
        <form
          className="flex flex-col wfull"
          onSubmit={async (e) => {
            e.preventDefault();
            setIsEditMode(false);

            const res = await fetch('/api/url', {
              method: 'PATCH',
              body: JSON.stringify({
                url: URL,
                userId,
              }),
            });

            const data = await res.json();

            console.log(data);
          }}
        >
          <Input type="text" value={URL} onChange={(e) => setURL(e.target.value)} />
          <button type="submit">제출</button>
        </form>
      ) : (
        <div>{session?.user.id}</div>
      )}

      <button
        onClick={() => setIsEditMode((prev) => !prev)}
        type="button"
        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        수정
      </button> */}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} value={URL} onChange={(e) => setURL(e.target.value)} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="outline" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileURL;
