<!-- Form for creating freets (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateStatusForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/statuses',
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'content', label: 'Content (must be less than 30 characters!)', value: ''}
      ],
      title: 'Add a status',
      refreshStatuses: true,
      callback: () => {
        const message = 'Successfully created a status!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>
