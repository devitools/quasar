<template>
  <div class="q-pa-md">
    <QMarkupTable>
      <thead>
        <tr>
          <th
            class="text-left"
            style="width: 150px"
          >
            <QSkeleton
              animation="blink"
              type="text"
            />
          </th>
          <th class="text-right">
            <QSkeleton
              animation="blink"
              type="text"
            />
          </th>
          <th class="text-right">
            <QSkeleton
              animation="blink"
              type="text"
            />
          </th>
          <th class="text-right">
            <QSkeleton
              animation="blink"
              type="text"
            />
          </th>
          <th class="text-right">
            <QSkeleton
              animation="blink"
              type="text"
            />
          </th>
          <th class="text-right">
            <QSkeleton
              animation="blink"
              type="text"
            />
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="n in 5"
          :key="n"
        >
          <td class="text-left">
            <QSkeleton
              animation="blink"
              type="text"
              width="85px"
            />
          </td>
          <td class="text-right">
            <QSkeleton
              animation="blink"
              type="text"
              width="50px"
            />
          </td>
          <td class="text-right">
            <QSkeleton
              animation="blink"
              type="text"
              width="35px"
            />
          </td>
          <td class="text-right">
            <QSkeleton
              animation="blink"
              type="text"
              width="65px"
            />
          </td>
          <td class="text-right">
            <QSkeleton
              animation="blink"
              type="text"
              width="25px"
            />
          </td>
          <td class="text-right">
            <QSkeleton
              animation="blink"
              type="text"
              width="85px"
            />
          </td>
        </tr>
      </tbody>
    </QMarkupTable>
  </div>
</template>

<script>
import { QSkeleton, QMarkupTable } from 'quasar'

export default {
  /**
   */
  name: 'SkeletonSchemaTable',
  /**
   */
  components: { QSkeleton, QMarkupTable }
}
</script>
