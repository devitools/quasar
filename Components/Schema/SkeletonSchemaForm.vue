<template>
  <div class="q-pa-md">
    <QCard style="max-width: 300px">
      <QItem>
        <QItemSection avatar>
          <QSkeleton type="QAvatar" />
        </QItemSection>

        <QItemSection>
          <QItemLabel>
            <QSkeleton type="text" />
          </QItemLabel>
          <QItemLabel caption>
            <QSkeleton type="text" />
          </QItemLabel>
        </QItemSection>
      </QItem>

      <QSkeleton
        height="200px"
        square
      />

      <QCardActions
        align="right"
        class="q-gutter-md"
      >
        <QSkeleton type="QBtn" />
        <QSkeleton type="QBtn" />
      </QCardActions>
    </QCard>
  </div>
</template>

<script>
import {
  QCard,
  QItem,
  QItemSection,
  QSkeleton,
  QItemLabel,
  QCardActions
} from 'quasar'

export default {
  /**
   */
  name: 'SkeletonSchemaForm',
  /**
   */
  components: {
    QCard,
    QItem,
    QItemSection,
    QSkeleton,
    QItemLabel,
    QCardActions
  }
}
</script>

<style scoped>

</style>
