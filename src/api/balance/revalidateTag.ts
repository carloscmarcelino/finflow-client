'use server';

import { revalidateTag } from 'next/cache';

import { balanceQueryKey } from './queryKey';

export async function revalidateBalanceTag() {
  revalidateTag(balanceQueryKey.get);
}
