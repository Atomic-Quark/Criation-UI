# 📚 Criation UI Components Guide

Criation UI provides standard, reusable components categorized into functional domains.

---

## 1. Buttons
- **`Button`**: Full-featured button with `variant` (`primary`, `secondary`, `outline`, `ghost`, `danger`, `success`), `size` (`xs`, `sm`, `md`, `lg`, `xl`), `loading` (spinner and accessible `aria-busy`), `leftIcon`, `rightIcon`, and `cursor` properties.
- **`IconButton`**: Square or circular button optimized for standalone icon triggers.
- **`ButtonGroup`**: Harmonious button grouping with optional `attached` connected borders.

## 2. Inputs & Forms
- **`Input`**: Base input primitive supporting prefix/suffix icons, clear buttons, and error states.
- **`TextInput`**: Accessible text input.
- **`PasswordInput`**: Password input with integrated show/hide toggle.
- **`EmailInput`**: Email input with validation attributes and mail icon.
- **`NumberInput`**: Min/max/step numeric input.
- **`TextArea`**: Multi-line text field.
- **`Select`**: Dropdown select with custom chevron arrow.
- **`Checkbox`**: Custom styled checkbox with label and description.
- **`Radio`**: Custom radio button option.
- **`Switch`**: Smooth toggle switch.
- **`Slider`**: Range slider with value readout.
- **`DatePicker`**: Date input with calendar icon.
- **`FileUpload`**: Drag-and-drop file upload zone.
- **`FormField`**, **`FormLabel`**, **`FormError`**, **`FormProvider`**: Comprehensive form validation system.

## 3. Layout & Structure
- **`Box`**: Polymorphic container (`as="div" | "section" | ...`) with direct styling props (`padding`, `margin`, `position`, `cursor`, `background`, `color`).
- **`Container`**: Viewport max-width limiter (`sm`, `md`, `lg`, `xl`, `2xl`, `full`).
- **`Stack`**: Vertical or horizontal flex arrange with consistent gap spacing.
- **`Grid`**: CSS grid container with column count and gap support.
- **`Flex`**: Direction, alignment, and wrapping helper.
- **`Divider`**: Horizontal or vertical separation rule.
- **`Spacer`**: Explicit pixel/rem spacing element.

## 4. Typography
- **`Heading`**: Levels `h1` through `h6` with optional gradient styling.
- **`Text`**: Paragraph, span, or label with weight, color, and truncation.
- **`Link`**: Internal and external links with automatic `noopener noreferrer` and icons.
- **`Code`**: Inline code badges and preformatted code blocks with one-click copy.

## 5. Data Display
- **`Card`**: Elevated, outlined, or glassmorphic content containers.
- **`Badge`**: Status indicators with pill shapes and dot indicators.
- **`Avatar`**: User avatars with image fallbacks, initials generation, and status badges.
- **`Table`**: Striped, hoverable, and compact tabular data grids.
- **`Accordion`**: Collapsible FAQ and disclosure lists.
- **`StatCard`**: Dashboard KPI cards with positive/negative trend indicators.

## 6. Feedback & Overlays
- **`Alert`**: Notification alerts (`info`, `success`, `warning`, `danger`).
- **`Toast`**: Contextual toast notifications via `useToast()`.
- **`Modal`**: Accessible dialog overlay with backdrop blur, focus trapping, and animations.
- **`Drawer`**: Slide-in sheet panel from `left` or `right`.
- **`Tooltip`**: Hover helper tooltip.
- **`Spinner`**: Animated circular loading spinner.
- **`Skeleton`**: Shimmering content placeholder.
- **`Progress`**: Linear progress bar with percentage readout.
- **`EmptyState`** & **`ErrorState`**: Standardized zero-state views.

## 7. Navigation
- **`Navbar`**: Responsive header with brand, navigation links, and mobile menu toggle.
- **`Sidebar`**: Collapsible vertical navigation bar.
- **`Tabs`**: Tabbed content switcher.
- **`Breadcrumbs`**: Hierarchical route trail.
- **`Pagination`**: Multi-page navigation controller.
- **`DropdownMenu`**: Pop-out action menus.

## 8. Templates
- **`LandingLayout`**: Complete marketing and landing page scaffold.
- **`DashboardLayout`**: Sidebar + topbar application layout.
- **`AuthLayout`**: Centered card layout with radial gradient backdrop.
- **`SettingsLayout`**: Two-column settings navigation layout.
