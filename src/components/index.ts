import WebformAutocomplete from './WebformAutocomplete';
import WebformText from './WebformText';
import WebformSelect from './WebformSelect';
import WebformTextArea from './WebformTextArea';
import ComponentRegistry from '../ComponentRegistry';
import WebformMultifield from './WebformMultifield';
import WebformComposite from './WebformComposite';
import WebformContainer from './WebformContainer';
import WebformFlexboxLayout from './WebformFlexboxLayout';
import WebformFieldset from './WebformFieldset';
import WebformSection from './WebformSection';
import WebformTable from './WebformTable';
import WebformRange from './WebformRange';
import WebformCheckbox from './WebformCheckbox';
import WebformRating from './WebformRating';
import WebformEmailConfirm from './WebformEmailConfirm';
import WebformValue from './WebformValue';
import WebformTermsOfService from './WebformTermsOfService';
import WebformDateTime from './WebformDateTime';
import WebformTime from './WebformTime';
import WebformDateList from './WebformDateList';
import WebformDate from './WebformDate';
import WebformItem from './WebformItem';
import WebformActions from './WebformActions';
import WebformCheckboxRadioGroup from './WebformCheckboxRadioGroup';
import WebformMarkup from './WebformMarkup';
import WebformHorizontalRule from './WebformHorizontalRule';
import WebformMessage from './WebformMessage';
import WebformButton from './WebformButton';
import WebformTableRow from './WebformTableRow';
import ConfirmationPage from './ConfirmationPage';
import FormLayout from './FormLayout';
import Message from './Message';
import WizardPage from './WizardPage';
import WebformCustomComposite from './WebformCustomComposite';

const defaultComponents = {
  // Text types.
  textfield: WebformText,
  number: WebformText,
  hidden: WebformText,
  email: WebformText,
  search: WebformText,
  tel: WebformText,
  url: WebformText,
  textarea: WebformTextArea,

  // Elements with fixed values.
  autocomplete: WebformAutocomplete,
  checkbox: WebformCheckbox,
  checkboxes: WebformCheckboxRadioGroup,
  entity_autocomplete: WebformAutocomplete,
  range: WebformRange,
  radio: WebformCheckbox,
  radios: WebformCheckboxRadioGroup,
  select: WebformSelect,
  webform_autocomplete: WebformAutocomplete,
  webform_checkboxes_other: WebformCheckboxRadioGroup,
  webform_entity_checkboxes: WebformCheckboxRadioGroup,
  webform_entity_radios: WebformCheckboxRadioGroup,
  webform_radios_other: WebformCheckboxRadioGroup,
  webform_rating: WebformRating,
  webform_select_other: WebformSelect,
  webform_terms_of_service: WebformTermsOfService,

  // Containers.
  container: WebformContainer,
  fieldset: WebformFieldset,
  webform_flexbox: WebformFlexboxLayout,
  webform_section: WebformSection,
  webform_table: WebformTable,
  webform_table_row: WebformTableRow,

  // Composite types.
  webform_address: WebformComposite,
  webform_contact: WebformComposite,
  webform_name: WebformComposite,
  webform_link: WebformComposite,
  webform_custom_composite: WebformCustomComposite,

  // Datetime types.
  date: WebformDate,
  datelist: WebformDateList,
  datetime: WebformDateTime,
  webform_time: WebformTime,

  button: WebformButton,
  submit: WebformActions,
  item: WebformItem,
  value: WebformValue,
  webform_actions: WebformActions,
  webform_email_confirm: WebformEmailConfirm,
  webform_multiple: WebformMultifield,

  // Non-form element components.
  confirmation_page: ConfirmationPage,
  form_layout: FormLayout,
  message: Message,
  webform_wizard_page: WizardPage,

  // Custom Messages, Markup (Work in progress)
  webform_message: WebformMessage,
  webform_markup: WebformMarkup,
  webform_horizontal_rule: WebformHorizontalRule,
};

export const defaultComponentRegistry = new ComponentRegistry(
  defaultComponents,
);

export default defaultComponents;
