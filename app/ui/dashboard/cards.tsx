import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import { fetchCardData } from "@/app/lib/data";
import { Suspense } from "react";
import { CardsSkeleton, CardSkeleton } from "../skeletons";

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {
  // const {
  //   numberOfCustomers,
  //   numberOfInvoices,
  //   totalPaidInvoices,
  //   totalPendingInvoices,
  // } = await fetchCardData();
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const numberOfCustomers = new Promise((resolve) =>
    setTimeout(() => {
      resolve(10);
    }, 2000)
  );
  const numberOfInvoices = new Promise((resolve) =>
    setTimeout(() => {
      resolve(5);
    }, 3000)
  );
  const totalPaidInvoices = new Promise((resolve) =>
    setTimeout(() => {
      resolve(3);
    }, 500)
  );
  const totalPendingInvoices = new Promise((resolve) =>
    setTimeout(() => {
      resolve(2);
    }, 5500)
  );

  // console.log("cards: ", numberOfCustomers);
  return (
    <>
      {/* NOTE: Uncomment this code in Chapter 9 */}
      <Suspense fallback={<CardSkeleton />}>
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
      </Suspense>
      <Suspense fallback={<CardSkeleton />}>
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
      </Suspense>
      <Suspense fallback={<CardSkeleton />}>
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      </Suspense>
      <Suspense fallback={<CardSkeleton />}>
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </Suspense>
    </>
  );
}
function CardSkeletonFour() {
  return (
    <>
      <CardsSkeleton />
      <CardsSkeleton />
      <CardsSkeleton />
      <CardsSkeleton />
    </>
  );
}
// export default async function CardWrapper() {
//   const {
//     numberOfCustomers,
//     numberOfInvoices,
//     totalPaidInvoices,
//     totalPendingInvoices,
//   } = await fetchCardData();

//   return (
//     <>
//       {/* NOTE: Uncomment this code in Chapter 9 */}

//       <Card title="Collected" value={totalPaidInvoices} type="collected" />
//       <Card title="Pending" value={totalPendingInvoices} type="pending" />
//       <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
//       <Card
//         title="Total Customers"
//         value={numberOfCustomers}
//         type="customers"
//       />
//     </>
//   );
// }

export async function Card({ title, value, type }) {
  // : {
  //   title: string;
  //   value: number | string | Promise<string | number | unknown>;
  //   type: "invoices" | "customers" | "pending" | "collected";
  // }
  const Icon = iconMap[type];
  let finalValue;
  if (value instanceof Promise) {
    console.log(`it's a promise`);
    finalValue = await value;
  } else {
    finalValue = value;
  }
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {finalValue}
      </p>
    </div>
  );
}
