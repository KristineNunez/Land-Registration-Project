import React from 'react';

const Table = () => {
  return (
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y-2 divide-gray-200 text-sm">
        <thead class="ltr:text-left rtl:text-right">
          <tr>
            <th class="sticky inset-y-0 start-0 bg-white px-4 py-2">
              <label for="SelectAll" class="sr-only">
                Select All
              </label>

              <input
                type="checkbox"
                id="SelectAll"
                class="h-5 w-5 rounded border-gray-300"
              />
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Name
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Date of Birth
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Role
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Salary
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          <tr>
            <td class="sticky inset-y-0 start-0 bg-white px-4 py-2">
              <label class="sr-only" for="Row1">
                Row 1
              </label>

              <input
                class="h-5 w-5 rounded border-gray-300"
                type="checkbox"
                id="Row1"
              />
            </td>
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              John Doe
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              24/05/1995
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              Web Developer
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">$120,000</td>
          </tr>

          <tr>
            <td class="sticky inset-y-0 start-0 bg-white px-4 py-2">
              <label class="sr-only" for="Row2">
                Row 2
              </label>

              <input
                class="h-5 w-5 rounded border-gray-300"
                type="checkbox"
                id="Row2"
              />
            </td>
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Jane Doe
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              04/11/1980
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              Web Designer
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">$100,000</td>
          </tr>

          <tr>
            <td class="sticky inset-y-0 start-0 bg-white px-4 py-2">
              <label class="sr-only" for="Row3">
                Row 3
              </label>

              <input
                class="h-5 w-5 rounded border-gray-300"
                type="checkbox"
                id="Row3"
              />
            </td>
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Gary Barlow
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              24/05/1995
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">Singer</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">$20,000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
