<template>
  <div>
    <div class="SchemaForm">
      <div class="app-form-wrapper">
        <div class="app-form-body">
          <div class="form form-grid">
            <div class="field width-100 height-1">
              <div class="q-pb-sm">
                <QSkeleton
                  animation="none"
                  type="rect"
                  width="50px"
                />
              </div>
              <QSkeleton
                animation="none"
                type="QInput"
                width="100%"
              />
            </div>
            <div class="field width-50 height-1">
              <div class="q-pb-sm q-pt-sm">
                <QSkeleton
                  animation="none"
                  type="rect"
                  width="100px"
                />
              </div>
              <QSkeleton
                animation="none"
                type="QInput"
                width="100%"
              />
            </div>
            <div class="field width-50 height-1">
              <div class="q-pb-sm q-pt-sm">
                <QSkeleton
                  animation="none"
                  type="rect"
                  width="50px"
                />
              </div>
              <QSkeleton
                animation="none"
                type="QInput"
                width="100%"
              />
            </div>
            <div class="field width-50 height-1">
              <div class="q-pb-sm q-pt-sm">
                <QSkeleton
                  animation="none"
                  type="rect"
                  width="70px"
                />
              </div>
              <QSkeleton
                animation="none"
                type="QToggle"
                width="100%"
              />
            </div>
          </div>
        </div>
        <div
          class="app-form-buttons flex q-gutter-md"
          style="height: 56px"
        >
          <QSkeleton
            animation="none"
            type="rect"
            width="100px"
            height="36px"
          />
          <QSpace />
          <QSkeleton
            animation="none"
            type="rect"
            width="100px"
            height="36px"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QSkeleton, QSpace } from 'quasar'

export default {
  /**
   */
  name: 'SkeletonSchemaForm',
  /**
   */
  components: { QSkeleton, QSpace }
}
</script>
