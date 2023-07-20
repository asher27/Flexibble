'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';

type Props = {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor: string;
  endCursor: string;
};
const LoadMore = ({ startCursor, endCursor, hasPreviousPage, hasNextPage }: Props) => {
  const router = useRouter();

  const handleNavigtion = (direction: string) => {
    const currentParams = new URLSearchParams(window.location.search);
    if (direction === 'next' && hasNextPage) {
      currentParams.delete('startcursor');
      currentParams.set('endcursor', endCursor);
    } else if (direction === 'first' && hasPreviousPage) {
      currentParams.delete('endcursor');
      currentParams.set('startcursor', startCursor);
    }

    const newSearchParams = currentParams.toString();
    console.log('window.location.pathname', window.location.pathname);
    const newPathname = `${window.location.pathname}?${newSearchParams}`;

    router.push(newPathname);

  };

  return (
    <div className={'w-full flexCenter gap-5 mt-10'}>
      {hasPreviousPage && (
        <Button title={'First Page'} handleClick={() => handleNavigtion('first')} />
      )}
      {hasNextPage && <Button title={'Next Shots'} handleClick={() => handleNavigtion('next')} />}
    </div>
  );
};

export default LoadMore;
