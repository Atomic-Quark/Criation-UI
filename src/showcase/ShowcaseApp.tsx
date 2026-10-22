import React, { useState } from "react";
import {
  Button,
  IconButton,
  ButtonGroup,
  TextInput,
  PasswordInput,
  EmailInput,
  NumberInput,
  TextArea,
  Select,
  Checkbox,
  Radio,
  Switch,
  Slider,
  DatePicker,
  FileUpload,
  Box,
  Container,
  Stack,
  Flex,
  Grid,
  Divider,
  Text,
  Heading,
  Link,
  Code,
  Card,
  Badge,
  Avatar,
  Table,
  Accordion,
  StatCard,
  Alert,
  useToast,
  Spinner,
  Skeleton,
  Progress,
  EmptyState,
  ErrorState,
  Modal,
  Drawer,
  Tooltip,
  Navbar,
  Tabs,
  Breadcrumbs,
  Pagination,
  DropdownMenu,
  FormField,
  Form,
  useTheme,
  LandingLayout,
  DashboardLayout,
  AuthLayout,
  Criation,
  Input,
  Image,
  Footer,
  SearchInput,
  OTPInput,
  Rating,
  Label,
  Combobox,
  MultiSelect,
  ColorPicker,
  AlertDialog,
  Stepper,
  Timeline,
  AspectRatio,
  ScrollArea,
  Collapsible,
  Result,
  useDataQuery,
  useCrudWorkflow,
  createApiClient,
} from "../index";
import {
  Sun,
  Moon,
  Sparkles,
  Layers,
  Component,
  Shield,
  Layout,
  Send,
  Zap,
  Check,
  Search,
  Settings,
  Bell,
  Heart,
  User,
  LogOut,
  Folder,
  BarChart3,
  ExternalLink,
  Code2,
  Terminal,
  Play,
  RefreshCw,
  Plus,
  Trash2,
  Copy,
} from "lucide-react";

export function ShowcaseApp() {
  const { activeTheme, toggleTheme } = useTheme();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState("playground");
  const [dslInput, setDslInput] = useState(
`Heading = "Store_Dashboard", 1, "main_heading", "gradient"
Text = "Welcome to the ultra-simple UI library! All components in 1 line.", "md", "desc", "muted"
Badge = "SALE_50%", "sm", "sale_badge", "danger"
Input = "Search_products_or_brands...", "360px", "search_box", "text", "Search Store", "blue"
Button = "Go_to_cart", "10px 2px", "ID", "Auth", "/cart", "red", "position", "pointer"
Link = "Explore Documentation", "https://github.com", "doc_link", "brand", true`
  );

  // Playground State
  const [pgComponent, setPgComponent] = useState<"button" | "input" | "alert" | "card" | "badge">("button");
  const [pgVariant, setPgVariant] = useState("primary");
  const [pgSize, setPgSize] = useState<"xs" | "sm" | "md" | "lg" | "xl">("md");
  const [pgDisabled, setPgDisabled] = useState(false);
  const [pgLoading, setPgLoading] = useState(false);
  const [pgText, setPgText] = useState("Click Me");
  const [pgSubtext, setPgSubtext] = useState("This is an important alert message.");
  const [pgCopied, setPgCopied] = useState(false);

  // Live Query Workflow Demo State
  const [queryTrigger, setQueryTrigger] = useState(0);
  const [queryShouldFail, setQueryShouldFail] = useState(false);

  // Live CRUD Workflow Demo State
  const initialCrudItems = [
    { id: "1", name: "Sarah Connor", role: "DevOps Engineer", status: "Active" },
    { id: "2", name: "John Doe", role: "Frontend Architect", status: "Active" },
    { id: "3", name: "Alex Rivera", role: "QA Automation Specialist", status: "On Leave" },
  ];
  const [crudItems, setCrudItems] = useState(initialCrudItems);
  const [crudSearch, setCrudSearch] = useState("");
  const [crudModalOpen, setCrudModalOpen] = useState(false);
  const [crudEditingItem, setCrudEditingItem] = useState<{ id?: string; name: string; role: string; status: string } | null>(null);
  const [crudFormName, setCrudFormName] = useState("");
  const [crudFormRole, setCrudFormRole] = useState("");
  const [crudFormStatus, setCrudFormStatus] = useState("Active");

  // Interactive Button State
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnSize, setBtnSize] = useState<"xs" | "sm" | "md" | "lg" | "xl">("md");

  // Interactive Modal & Drawer State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Form State
  const [sampleEmail, setSampleEmail] = useState("");
  const [samplePassword, setSamplePassword] = useState("");
  const [sampleSwitch, setSampleSwitch] = useState(true);
  const [sampleSlider, setSampleSlider] = useState(65);
  const [sampleCheckbox, setSampleCheckbox] = useState(true);
  const [sampleRadio, setSampleRadio] = useState("option1");
  const [currentPage, setCurrentPage] = useState(1);

  const navItems = [
    { id: "playground", label: "Interactive Playground", icon: <Sparkles size={18} /> },
    { id: "workflows", label: "Workflows & CLI", icon: <Terminal size={18} /> },
    { id: "shorthand", label: "1-Line Shorthand", icon: <Code2 size={18} /> },
    { id: "overview", label: "Overview", icon: <Sparkles size={18} /> },
    { id: "buttons", label: "Buttons & Actions", icon: <Zap size={18} /> },
    { id: "inputs", label: "Inputs & Forms", icon: <Component size={18} /> },
    { id: "layout", label: "Layout & Box", icon: <Layout size={18} /> },
    { id: "data", label: "Data Display", icon: <Layers size={18} /> },
    { id: "feedback", label: "Feedback & Overlays", icon: <Bell size={18} /> },
    { id: "templates", label: "Page Templates", icon: <BarChart3 size={18} /> },
    { id: "auth", label: "Auth & Routing", icon: <Shield size={18} /> },
  ];

  return (
    <div className="cr-showcase-container">
      {/* Top Navbar */}
      <Navbar
        brand={
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #6366f1, #38bdf8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 800,
                fontSize: "1.2rem",
              }}
            >
              C
            </div>
            <div>
              <span style={{ fontWeight: 800, fontSize: "1.25rem", letterSpacing: "-0.02em" }}>
                Criation UI
              </span>
              <Badge variant="primary" size="xs" style={{ marginLeft: "8px" }}>
                v0.3.0-beta (Developer Preview)
              </Badge>
            </div>
          </div>
        }
        links={
          <Flex gap="1.5rem" align="center">
            <Link href="#documentation" color="primary">Documentation</Link>
            <Link href="#components" color="primary">Components</Link>
            <Link href="https://github.com" isExternal color="muted">GitHub</Link>
          </Flex>
        }
        actions={
          <Flex gap="0.75rem" align="center">
            <IconButton
              icon={activeTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              aria-label="Toggle theme mode"
              variant="outline"
              size="sm"
              onClick={toggleTheme}
            />
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Send size={14} />}
              onClick={() => toast.success("Criation UI is ready for your next website!", "Welcome")}
            >
              Get Started
            </Button>
          </Flex>
        }
        sticky
        glass
      />

      <div style={{ display: "flex", minHeight: "calc(100vh - 4rem)" }}>
        {/* Sidebar Nav */}
        <aside
          style={{
            width: "260px",
            borderRight: "1px solid var(--cr-border-subtle)",
            background: "var(--cr-bg-surface)",
            padding: "1.5rem 1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.35rem",
          }}
        >
          <div style={{ padding: "0 0.75rem 0.75rem", fontSize: "0.75rem", fontWeight: 700, color: "var(--cr-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Component Library
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`cr-sidebar__item ${activeTab === item.id ? "is-active" : ""}`}
            >
              <span className="cr-sidebar__icon">{item.icon}</span>
              <span className="cr-sidebar__label">{item.label}</span>
            </button>
          ))}
        </aside>

        {/* Main Content Showcase */}
        <main style={{ flex: 1, padding: "2.5rem 3rem", overflowY: "auto", maxWidth: "1200px" }}>
                    {/* SECTION: INTERACTIVE PLAYGROUND */}
          {activeTab === "playground" && (
            <Stack spacing="2rem">
              <div>
                <Flex justify="between" align="center" wrap gap="1rem">
                  <div>
                    <Heading level={1} size="2xl" gradient>
                      Interactive Component Playground
                    </Heading>
                    <Text size="md" color="secondary" style={{ marginTop: "0.5rem" }}>
                      Live developer sandbox for tweaking component props, validating keyboard accessibility and WAI-ARIA states, and copying production JSX.
                    </Text>
                  </div>
                  <Flex gap="0.5rem" wrap>
                    <Badge variant="primary" size="sm">v0.3.0-beta</Badge>
                    <Badge variant="success" size="sm">WCAG 2.2 AA</Badge>
                    <Badge variant="secondary" size="sm">Zero Runtime CSS</Badge>
                  </Flex>
                </Flex>
              </div>

              {/* Component Picker Tabs */}
              <Card variant="outline" padding="sm">
                <Flex gap="0.5rem" wrap>
                  {[
                    { id: "button", label: "Button" },
                    { id: "input", label: "Input" },
                    { id: "alert", label: "Alert" },
                    { id: "card", label: "Card" },
                    { id: "badge", label: "Badge" },
                  ].map((c) => (
                    <Button
                      key={c.id}
                      variant={pgComponent === c.id ? "primary" : "ghost"}
                      size="sm"
                      onClick={() => {
                        setPgComponent(c.id as any);
                        if (c.id === "button") { setPgVariant("primary"); setPgText("Click Me"); }
                        if (c.id === "input") { setPgVariant("default"); setPgText("Enter value..."); }
                        if (c.id === "alert") { setPgVariant("info"); setPgText("System Notification"); }
                        if (c.id === "card") { setPgVariant("outline"); setPgText("Project Summary"); }
                        if (c.id === "badge") { setPgVariant("primary"); setPgText("Beta 0.3.0"); }
                      }}
                    >
                      {c.label}
                    </Button>
                  ))}
                </Flex>
              </Card>

              {/* Playground Split View: Controls on Left, Live Canvas & Code on Right */}
              <Grid columns={2} gap="1.5rem">
                {/* Controls Card */}
                <Card variant="outline" padding="lg">
                  <Heading level={3} size="sm" style={{ marginBottom: "1.25rem" }}>
                    Configure Props
                  </Heading>
                  <Stack spacing="1.25rem">
                    {/* Variant Selector */}
                    <div>
                      <Label htmlFor="pg-variant">Variant</Label>
                      <Select
                        id="pg-variant"
                        value={pgVariant}
                        onChange={(e) => setPgVariant(e.target.value)}
                        options={
                          pgComponent === "button"
                            ? [
                                { value: "primary", label: "Primary" },
                                { value: "secondary", label: "Secondary" },
                                { value: "danger", label: "Danger" },
                                { value: "ghost", label: "Ghost" },
                                { value: "outline", label: "Outline" },
                              ]
                            : pgComponent === "alert"
                            ? [
                                { value: "info", label: "Info" },
                                { value: "success", label: "Success" },
                                { value: "warning", label: "Warning" },
                                { value: "danger", label: "Danger" },
                              ]
                            : pgComponent === "card"
                            ? [
                                { value: "outline", label: "Outline" },
                                { value: "elevated", label: "Elevated" },
                                { value: "glass", label: "Glass" },
                                { value: "flat", label: "Flat" },
                              ]
                            : [
                                { value: "primary", label: "Primary" },
                                { value: "success", label: "Success" },
                                { value: "warning", label: "Warning" },
                                { value: "danger", label: "Danger" },
                                { value: "secondary", label: "Secondary" },
                              ]
                        }
                      />
                    </div>

                    {/* Size Selector */}
                    <div>
                      <Label htmlFor="pg-size">Size</Label>
                      <Select
                        id="pg-size"
                        value={pgSize}
                        onChange={(e) => setPgSize(e.target.value as any)}
                        options={[
                          { value: "xs", label: "Extra Small (xs)" },
                          { value: "sm", label: "Small (sm)" },
                          { value: "md", label: "Medium (md)" },
                          { value: "lg", label: "Large (lg)" },
                          { value: "xl", label: "Extra Large (xl)" },
                        ]}
                      />
                    </div>

                    {/* Text / Label */}
                    <div>
                      <Label htmlFor="pg-text">Label / Title</Label>
                      <TextInput
                        id="pg-text"
                        value={pgText}
                        onChange={(e) => setPgText(e.target.value)}
                        placeholder="Label text..."
                      />
                    </div>

                    {/* Subtext (for Alert or Card) */}
                    {(pgComponent === "alert" || pgComponent === "card") && (
                      <div>
                        <Label htmlFor="pg-subtext">Description / Body</Label>
                        <TextInput
                          id="pg-subtext"
                          value={pgSubtext}
                          onChange={(e) => setPgSubtext(e.target.value)}
                          placeholder="Description..."
                        />
                      </div>
                    )}

                    {/* State Toggles */}
                    <Flex gap="1.5rem" wrap>
                      <Checkbox
                        id="pg-disabled"
                        label="Disabled"
                        checked={pgDisabled}
                        onChange={(e) => setPgDisabled(e.target.checked)}
                      />
                      {pgComponent === "button" && (
                        <Checkbox
                          id="pg-loading"
                          label="Loading State"
                          checked={pgLoading}
                          onChange={(e) => setPgLoading(e.target.checked)}
                        />
                      )}
                    </Flex>
                  </Stack>
                </Card>

                {/* Live Preview Canvas & Accessibility Matrix */}
                <Stack spacing="1.5rem">
                  <Card
                    variant="glass"
                    padding="lg"
                    style={{
                      minHeight: "180px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px dashed var(--cr-border-subtle)",
                      background: "var(--cr-bg-surface-hover)",
                    }}
                  >
                    {pgComponent === "button" && (
                      <Button
                        variant={pgVariant as any}
                        size={pgSize}
                        disabled={pgDisabled}
                        loading={pgLoading}
                        onClick={() => toast.success(`Button (${pgVariant}, ${pgSize}) activated!`, "Interaction Verified")}
                      >
                        {pgText}
                      </Button>
                    )}
                    {pgComponent === "input" && (
                      <div style={{ width: "100%", maxWidth: "360px" }}>
                        <Input
                          placeholder={pgText}
                          size={pgSize}
                          disabled={pgDisabled}
                        />
                        <Text size="xs" color="secondary" style={{ marginTop: "0.25rem" }}>
                          {pgDisabled ? "Field is currently disabled" : "Press Tab to navigate, type to input"}
                        </Text>
                      </div>
                    )}
                    {pgComponent === "alert" && (
                      <div style={{ width: "100%" }}>
                        <Alert variant={pgVariant as any} title={pgText}>
                          {pgSubtext}
                        </Alert>
                      </div>
                    )}
                    {pgComponent === "card" && (
                      <Card variant={pgVariant as any} padding={pgSize} style={{ width: "100%" }}>
                        <Heading level={4} size="md">{pgText}</Heading>
                        <Text color="secondary" size="sm" style={{ marginTop: "0.5rem" }}>
                          {pgSubtext}
                        </Text>
                      </Card>
                    )}
                    {pgComponent === "badge" && (
                      <Badge variant={pgVariant as any} size={pgSize}>
                        {pgText}
                      </Badge>
                    )}
                  </Card>

                  {/* Accessibility & Focus Inspector */}
                  <Card variant="outline" padding="md">
                    <Flex justify="between" align="center" style={{ marginBottom: "0.75rem" }}>
                      <Heading level={4} size="xs" style={{ textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--cr-text-muted)" }}>
                        Accessibility & Keyboard Spec
                      </Heading>
                      <Badge variant="success" size="xs">A11y Verified</Badge>
                    </Flex>
                    <Grid columns={2} gap="0.75rem" style={{ fontSize: "0.825rem" }}>
                      <div>
                        <strong>Semantic Tag:</strong>{" "}
                        <code>
                          {pgComponent === "button" ? "<button>" : pgComponent === "input" ? "<input>" : pgComponent === "alert" ? '<div role="alert">' : "<div>"}
                        </code>
                      </div>
                      <div>
                        <strong>Keyboard Access:</strong>{" "}
                        <code>{pgDisabled ? "Excluded (tabIndex -1)" : "Tab / Shift+Tab reachable"}</code>
                      </div>
                      <div>
                        <strong>Activation Key:</strong>{" "}
                        <code>{pgComponent === "button" ? "Enter or Space" : pgComponent === "input" ? "Any alphanumeric" : "N/A (Static)"}</code>
                      </div>
                      <div>
                        <strong>WCAG 2.2 Contrast:</strong>{" "}
                        <span style={{ color: "var(--cr-success)" }}>Passes AA (≥ 4.5:1 ratio)</span>
                      </div>
                    </Grid>
                  </Card>

                  {/* Generated JSX Snippet */}
                  <Card variant="outline" padding="md">
                    <Flex justify="between" align="center" style={{ marginBottom: "0.5rem" }}>
                      <Text size="xs" weight="bold" color="muted" style={{ textTransform: "uppercase" }}>
                        Generated JSX
                      </Text>
                      <Button
                        variant="ghost"
                        size="xs"
                        leftIcon={<Copy size={12} />}
                        onClick={() => {
                          const code = pgComponent === "button"
                            ? `<Button variant="${pgVariant}" size="${pgSize}"${pgDisabled ? " disabled" : ""}${pgLoading ? " loading" : ""}>\n  ${pgText}\n</Button>`
                            : pgComponent === "input"
                            ? `<Input placeholder="${pgText}" size="${pgSize}"${pgDisabled ? " disabled" : ""} fullWidth />`
                            : pgComponent === "alert"
                            ? `<Alert variant="${pgVariant}" title="${pgText}">\n  ${pgSubtext}\n</Alert>`
                            : pgComponent === "card"
                            ? `<Card variant="${pgVariant}" padding="${pgSize}">\n  <Heading level={3}>${pgText}</Heading>\n  <Text color="secondary">${pgSubtext}</Text>\n</Card>`
                            : `<Badge variant="${pgVariant}" size="${pgSize}">\n  ${pgText}\n</Badge>`;
                          navigator.clipboard?.writeText(code);
                          toast.success("JSX snippet copied to clipboard!", "Copied");
                        }}
                      >
                        Copy JSX
                      </Button>
                    </Flex>
                    <Code block language="tsx">
                      {pgComponent === "button" && `<Button variant="${pgVariant}" size="${pgSize}"${pgDisabled ? " disabled" : ""}${pgLoading ? " loading" : ""}>\n  ${pgText}\n</Button>`}
                      {pgComponent === "input" && `<Input placeholder="${pgText}" size="${pgSize}"${pgDisabled ? " disabled" : ""} fullWidth />`}
                      {pgComponent === "alert" && `<Alert variant="${pgVariant}" title="${pgText}">\n  ${pgSubtext}\n</Alert>`}
                      {pgComponent === "card" && `<Card variant="${pgVariant}" padding="${pgSize}">\n  <Heading level={3}>${pgText}</Heading>\n  <Text color="secondary">${pgSubtext}</Text>\n</Card>`}
                      {pgComponent === "badge" && `<Badge variant="${pgVariant}" size="${pgSize}">\n  ${pgText}\n</Badge>`}
                    </Code>
                  </Card>
                </Stack>
              </Grid>
            </Stack>
          )}

          {/* SECTION: WORKFLOWS & CLI */}
          {activeTab === "workflows" && (
            <Stack spacing="2.5rem">
              <div>
                <Heading level={1} size="2xl" gradient>
                  High-Level Developer Workflows & Scaffolding
                </Heading>
                <Text size="lg" color="secondary" style={{ marginTop: "0.5rem" }}>
                  Real applications require more than isolated buttons. Criation UI provides complete end-to-end hooks, CRUD data synchronization, and a developer CLI to build full-stack features fast.
                </Text>
              </div>

              {/* Workflow 1: useDataQuery */}
              <Card variant="outline" padding="lg">
                <Flex justify="between" align="center" style={{ marginBottom: "1rem" }}>
                  <div>
                    <Heading level={2} size="md">1. Reactive Data Querying (`useDataQuery`)</Heading>
                    <Text size="sm" color="secondary" style={{ marginTop: "0.25rem" }}>
                      Handles loading states, error boundaries, mount cancellation, and retry logic out of the box.
                    </Text>
                  </div>
                  <Badge variant="primary" size="sm">Hook</Badge>
                </Flex>

                <Grid columns={2} gap="1.5rem">
                  <div>
                    <Code block copyable language="tsx">
{`import { useDataQuery } from "@criation/ui";

const { data, loading, error, refetch } = useDataQuery(
  async () => {
    const res = await fetch("/api/members");
    if (!res.ok) throw new Error("Failed to load");
    return res.json();
  },
  { retries: 2, retryDelayMs: 500 }
);`}
                    </Code>
                  </div>

                  <Card variant="glass" padding="md">
                    <Flex justify="between" align="center" style={{ marginBottom: "0.75rem" }}>
                      <Text size="sm" weight="bold">Live Query Simulation</Text>
                      <Badge variant={queryTrigger === 0 ? "secondary" : queryShouldFail ? "danger" : "success"} size="xs">
                        {queryTrigger === 0 ? "Idle" : queryShouldFail ? "Error (500)" : "Success (200 OK)"}
                      </Badge>
                    </Flex>
                    <Flex gap="0.5rem" wrap style={{ marginBottom: "1rem" }}>
                      <Button
                        size="sm"
                        variant="primary"
                        leftIcon={<Play size={14} />}
                        onClick={() => {
                          setQueryShouldFail(false);
                          setQueryTrigger((p) => p + 1);
                          toast.success("Query resolved with 3 records (200 OK)!", "Data Loaded");
                        }}
                      >
                        Simulate Success
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        leftIcon={<RefreshCw size={14} />}
                        onClick={() => {
                          setQueryShouldFail(true);
                          setQueryTrigger((p) => p + 1);
                          toast.error("Query failed with 500 Internal Error (Auto-retry triggered)", "Query Error");
                        }}
                      >
                        Simulate 500 Failure
                      </Button>
                    </Flex>

                    {queryTrigger === 0 ? (
                      <EmptyState
                        title="No query executed yet"
                        description="Click either button above to test the reactive data workflow."
                      />
                    ) : queryShouldFail ? (
                      <Alert variant="danger" title="Network Error: 500 Internal Server Error">
                        The API request failed. <code>useDataQuery</code> automatically initiated 2 retries before escalating to the error state.
                      </Alert>
                    ) : (
                      <div style={{ background: "var(--cr-bg-surface)", padding: "0.75rem", borderRadius: "6px", fontSize: "0.85rem" }}>
                        <Text size="xs" color="muted" weight="bold">API RESPONSE (JSON):</Text>
                        <pre style={{ margin: "0.5rem 0 0", color: "var(--cr-primary)" }}>
{JSON.stringify([
  { id: 1, name: "Sarah Connor", role: "DevOps Engineer" },
  { id: 2, name: "John Doe", role: "Frontend Architect" }
], null, 2)}
                        </pre>
                      </div>
                    )}
                  </Card>
                </Grid>
              </Card>

              {/* Workflow 2: useCrudWorkflow */}
              <Card variant="outline" padding="lg">
                <Flex justify="between" align="center" style={{ marginBottom: "1rem" }}>
                  <div>
                    <Heading level={2} size="md">2. Synchronized CRUD Workflow (`useCrudWorkflow`)</Heading>
                    <Text size="sm" color="secondary" style={{ marginTop: "0.25rem" }}>
                      Manages list state, modal forms, editing records, and delete flows in a single reusable hook.
                    </Text>
                  </div>
                  <Badge variant="success" size="sm">CRUD Recipe</Badge>
                </Flex>

                {/* Filter and Add Button */}
                <Flex justify="between" align="center" gap="1rem" wrap style={{ marginBottom: "1rem" }}>
                  <div style={{ maxWidth: "300px", width: "100%" }}>
                    <SearchInput
                      placeholder="Filter members..."
                      value={crudSearch}
                      onChange={(val) => setCrudSearch(val)}
                    />
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<Plus size={14} />}
                    onClick={() => {
                      setCrudEditingItem(null);
                      setCrudFormName("");
                      setCrudFormRole("");
                      setCrudFormStatus("Active");
                      setCrudModalOpen(true);
                    }}
                  >
                    Add Member
                  </Button>
                </Flex>

                {/* Items Table */}
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid var(--cr-border-subtle)", textAlign: "left" }}>
                        <th style={{ padding: "0.75rem" }}>Name</th>
                        <th style={{ padding: "0.75rem" }}>Role</th>
                        <th style={{ padding: "0.75rem" }}>Status</th>
                        <th style={{ padding: "0.75rem", textAlign: "right" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {crudItems
                        .filter((item) => item.name.toLowerCase().includes(crudSearch.toLowerCase()) || item.role.toLowerCase().includes(crudSearch.toLowerCase()))
                        .map((item) => (
                          <tr key={item.id} style={{ borderBottom: "1px solid var(--cr-border-subtle)" }}>
                            <td style={{ padding: "0.75rem", fontWeight: 600 }}>{item.name}</td>
                            <td style={{ padding: "0.75rem", color: "var(--cr-text-secondary)" }}>{item.role}</td>
                            <td style={{ padding: "0.75rem" }}>
                              <Badge variant={item.status === "Active" ? "success" : "secondary"} size="xs">
                                {item.status}
                              </Badge>
                            </td>
                            <td style={{ padding: "0.75rem", textAlign: "right" }}>
                              <Flex gap="0.5rem" justify="end">
                                <Button
                                  variant="ghost"
                                  size="xs"
                                  onClick={() => {
                                    setCrudEditingItem(item);
                                    setCrudFormName(item.name);
                                    setCrudFormRole(item.role);
                                    setCrudFormStatus(item.status);
                                    setCrudModalOpen(true);
                                  }}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="danger"
                                  size="xs"
                                  leftIcon={<Trash2 size={12} />}
                                  onClick={() => {
                                    setCrudItems((prev) => prev.filter((i) => i.id !== item.id));
                                    toast.success(`Removed ${item.name} from directory`, "Record Deleted");
                                  }}
                                >
                                  Delete
                                </Button>
                              </Flex>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                {/* CRUD Modal Dialog */}
                <Modal
                  isOpen={crudModalOpen}
                  onClose={() => setCrudModalOpen(false)}
                  title={crudEditingItem ? "Edit Member" : "Add New Member"}
                >
                  <Stack spacing="1rem">
                    <div>
                      <Label htmlFor="crud-name" required>Full Name</Label>
                      <TextInput
                        id="crud-name"
                        value={crudFormName}
                        onChange={(e) => setCrudFormName(e.target.value)}
                        placeholder="e.g. Alex Morgan"
                      />
                    </div>
                    <div>
                      <Label htmlFor="crud-role" required>Role / Title</Label>
                      <TextInput
                        id="crud-role"
                        value={crudFormRole}
                        onChange={(e) => setCrudFormRole(e.target.value)}
                        placeholder="e.g. Cloud Engineer"
                      />
                    </div>
                    <div>
                      <Label htmlFor="crud-status">Status</Label>
                      <Select
                        id="crud-status"
                        value={crudFormStatus}
                        onChange={(e) => setCrudFormStatus(e.target.value)}
                        options={[
                          { value: "Active", label: "Active" },
                          { value: "On Leave", label: "On Leave" },
                          { value: "Archived", label: "Archived" },
                        ]}
                      />
                    </div>
                    <Flex justify="end" gap="0.75rem" style={{ marginTop: "1rem" }}>
                      <Button variant="ghost" onClick={() => setCrudModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          if (!crudFormName.trim()) {
                            toast.error("Name is required", "Validation Error");
                            return;
                          }
                          if (crudEditingItem) {
                            setCrudItems((prev) =>
                              prev.map((i) => (i.id === crudEditingItem.id ? { ...i, name: crudFormName, role: crudFormRole, status: crudFormStatus } : i))
                            );
                            toast.success(`Updated ${crudFormName}`, "Record Saved");
                          } else {
                            const newRec = {
                              id: String(Date.now()),
                              name: crudFormName,
                              role: crudFormRole,
                              status: crudFormStatus,
                            };
                            setCrudItems((prev) => [...prev, newRec]);
                            toast.success(`Created member ${crudFormName}`, "Record Created");
                          }
                          setCrudModalOpen(false);
                        }}
                      >
                        Save Record
                      </Button>
                    </Flex>
                  </Stack>
                </Modal>
              </Card>

              {/* Workflow 3: Developer CLI Scaffolding */}
              <Card variant="outline" padding="lg">
                <Flex justify="between" align="center" style={{ marginBottom: "1rem" }}>
                  <div>
                    <Heading level={2} size="md">3. Developer CLI Scaffolding (`bin/criation.js`)</Heading>
                    <Text size="sm" color="secondary" style={{ marginTop: "0.25rem" }}>
                      Zero-configuration scaffolding tool for rapidly spinning up projects, adding workflows, running benchmarks, and validating test suites.
                    </Text>
                  </div>
                  <Badge variant="primary" size="sm">CLI Scaffolder</Badge>
                </Flex>

                <Grid columns={2} gap="1.5rem">
                  <Stack spacing="0.75rem">
                    <Card variant="outline" padding="sm">
                      <Text size="sm" weight="bold">Initialize Full Application</Text>
                      <Code block language="bash">npx @criation/ui init my-app</Code>
                      <Text size="xs" color="muted">Creates React + Vite + TypeScript application pre-wired with Criation UI and CSS tokens.</Text>
                    </Card>

                    <Card variant="outline" padding="sm">
                      <Text size="sm" weight="bold">Scaffold CRUD Workflow Recipe</Text>
                      <Code block language="bash">npx @criation/ui add crud</Code>
                      <Text size="xs" color="muted">Generates a complete data management table with modal form and hooks.</Text>
                    </Card>

                    <Card variant="outline" padding="sm">
                      <Text size="sm" weight="bold">Execute Empirical Benchmark</Text>
                      <Code block language="bash">npm run benchmark</Code>
                      <Text size="xs" color="muted">Measures bundle sizes (33.9 kB CSS, 233 kB ESM) and micro-operation throughput.</Text>
                    </Card>
                  </Stack>

                  <Card variant="glass" padding="md" style={{ background: "#0f172a", color: "#e2e8f0" }}>
                    <Flex justify="between" align="center" style={{ marginBottom: "0.75rem" }}>
                      <Flex align="center" gap="0.5rem">
                        <Terminal size={16} color="#38bdf8" />
                        <Text size="xs" weight="bold" style={{ color: "#94a3b8" }}>criation cli emulator</Text>
                      </Flex>
                      <Badge variant="success" size="xs">{"Node >= 18"}</Badge>
                    </Flex>
                    <pre style={{ margin: 0, fontSize: "0.8rem", lineHeight: 1.5, fontFamily: "monospace", overflowX: "auto" }}>
{`$ npx @criation/ui audit
[CRIATION AUDIT] Running TypeScript compiler check...
[CRIATION AUDIT] Running automated test suite...
=== CRIATION UI VERIFICATION REPORT ===
Category 1 (Utilities): 11/11 PASSED
Category 2 (Design System): 4/4 PASSED
Category 3 (Core Components): 16/16 PASSED
Category 4 (English Chaining): 28/28 PASSED
Category 5 (Bug Fix Regressions): 5/5 PASSED
Category 6 (Advanced Capabilities): 5/5 PASSED
Category 7 (useForm Hook): 5/5 PASSED
Category 8 (WAI-ARIA Accessibility): 10/10 PASSED
Category 9 (Developer Workflows): 4/4 PASSED
TOTAL TESTS: 88
PASSED: 88 | FAILED: 0 | PASS RATE: 100%`}
                    </pre>
                  </Card>
                </Grid>
              </Card>
            </Stack>
          )}

{/* SECTION: 1-LINE SHORTHAND */}
          {activeTab === "shorthand" && (
            <Stack spacing="2.5rem">
              <div>
                <Heading level={1} size="2xl" gradient>
                  1-Line Component Shorthand (All Components Simplified)
                </Heading>
                <Text size="lg" color="secondary" style={{ marginTop: "0.5rem" }}>
                  Every component is now ultra-simple! Write clean code that reads <strong>just like plain English</strong>.
                  Use fluent dot-chaining, natural English phrases in strings, or classic shorthands. Every parameter is optional!
                </Text>
              </div>

              {/* NEW: JUST LIKE WRITING ENGLISH (FLUENT CHAINING & NATURAL STRINGS) */}
              <Card variant="glass" padding="lg" style={{ border: "1px solid rgba(99, 102, 241, 0.4)", background: "linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(236, 72, 153, 0.05))" }}>
                <Flex justify="between" align="center" style={{ marginBottom: "1rem" }}>
                  <div>
                    <Heading level={2} size="xl" gradient>
                      ✨ Just Like Writing English: Fluent Dot-Chaining & Natural Phrases
                    </Heading>
                    <Text size="md" color="secondary" style={{ marginTop: "0.25rem" }}>
                      Write UI that reads like a sentence! Chain properties fluidly or pass natural English phrases. Zero learning curve, 100% full power.
                    </Text>
                  </div>
                  <Badge variant="primary" size="md">English-Style API</Badge>
                </Flex>

                <Grid columns={2} gap="1.5rem" style={{ marginTop: "1rem" }}>
                  {/* Column 1: Fluent Dot Chaining */}
                  <Card variant="outline" padding="md">
                    <Flex justify="between" align="center" style={{ marginBottom: "0.75rem" }}>
                      <Heading level={3} size="sm">1. Fluent Dot-Chaining (Reads Like English)</Heading>
                      <Badge variant="success" size="xs">Chainable</Badge>
                    </Flex>
                    <Code block language="tsx">
{`// Reads literally like an English sentence!
Button("Go to cart").red().link("/cart").auth()
Button("Shop Now").green().link("/shop")
Heading("Welcome to Criation").gradient().center().level(1)
Text("Fastest way to build apps").muted().center()
Badge("HOT SALE").red().small()
Input("Search items...").search().width("350px")`}
                    </Code>

                    <div style={{ marginTop: "1.25rem", padding: "1rem", background: "var(--cr-bg-surface-hover)", borderRadius: "8px" }}>
                      <Text size="xs" color="muted" weight="bold" style={{ textTransform: "uppercase", marginBottom: "0.75rem" }}>
                        Live Chained Elements:
                      </Text>
                      <Stack spacing="0.75rem">
                        {Heading("Welcome to Criation").gradient().center().level(3)}
                        {Text("Handcrafted components built for ultimate speed and developer delight.").muted().center()}
                        <Flex gap="0.75rem" justify="center" wrap>
                          {Button("Go to Cart").red().link("/cart").auth()}
                          {Button("Shop Now").green().link("/shop")}
                          {Badge("HOT SALE").red().small()}
                        </Flex>
                        <div style={{ maxWidth: "350px", margin: "0 auto", width: "100%" }}>
                          {Input("Search products...").search().width("100%")}
                        </div>
                      </Stack>
                    </div>
                  </Card>

                  {/* Column 2: Natural English Phrases */}
                  <Card variant="outline" padding="md">
                    <Flex justify="between" align="center" style={{ marginBottom: "0.75rem" }}>
                      <Heading level={3} size="sm">2. Natural English Phrases in Strings</Heading>
                      <Badge variant="primary" size="xs">Smart NLP</Badge>
                    </Flex>
                    <Code block language="tsx">
{`// Write natural English keywords in strings!
Button("Go to cart, colored red, go to /cart, auth required")
Heading("Welcome to Criation, level 2, centered, with gradient")
Text("Handcrafted with pride, centered, muted, size large")
Badge("50% DISCOUNT, in green, small")
Link("Read Documentation, to /docs, open in new tab")`}
                    </Code>

                    <div style={{ marginTop: "1.25rem", padding: "1rem", background: "var(--cr-bg-surface-hover)", borderRadius: "8px" }}>
                      <Text size="xs" color="muted" weight="bold" style={{ textTransform: "uppercase", marginBottom: "0.75rem" }}>
                        Live Rendered Natural Phrases:
                      </Text>
                      <Stack spacing="0.75rem">
                        {Heading("Welcome to Store, level 3, centered, with gradient")}
                        {Text("The fastest way to write UI in plain English, centered, muted")}
                        <Flex gap="0.75rem" justify="center" wrap>
                          {Button("Go to cart, colored red, go to /cart, auth required")}
                          {Badge("50% DISCOUNT, in green, small")}
                        </Flex>
                        <div style={{ textAlign: "center" }}>
                          {Link("Read Documentation, to /docs, open in new tab")}
                        </div>
                      </Stack>
                    </div>
                  </Card>
                </Grid>

                {/* Website in 3 Lines Callout */}
                <Box padding="1.25rem" background="var(--cr-bg-surface-hover)" borderRadius="10px" style={{ marginTop: "1.5rem", borderLeft: "4px solid #10b981" }}>
                  <Flex justify="between" align="center" wrap gap="1rem">
                    <div>
                      <Heading level={4} size="sm" style={{ color: "#10b981" }}>
                        🚀 Whole Website in 3 Lines of Plain Code:
                      </Heading>
                      <code style={{ fontSize: "0.85rem", color: "var(--cr-text-primary)", display: "block", marginTop: "0.25rem" }}>
                        Website("My Store", [ Heading("Welcome").gradient(), Button("Buy").green().link("/cart") ]);
                      </code>
                    </div>
                    <Badge variant="success" size="sm">Zero Boilerplate</Badge>
                  </Flex>
                </Box>
              </Card>

              {/* Complete Webpage / Product Demo Built with Zero HTML Tags */}
              <Card variant="glass" padding="lg">
                <Flex justify="between" align="center" style={{ marginBottom: "1rem" }}>
                  <div>
                    <Heading level={3} size="md">Live Mini-Page Built With Zero HTML Tags</Heading>
                    <Text size="sm" color="muted">Constructed purely by composing 1-line function calls</Text>
                  </div>
                  <Badge variant="success" size="sm">Pure Function Calls</Badge>
                </Flex>

                <Grid columns={2} gap="2rem">
                  <Box padding="1.5rem" background="var(--cr-bg-surface-hover)" borderRadius="12px">
                    <Text size="xs" color="brand" weight="bold" style={{ textTransform: "uppercase", marginBottom: "0.75rem" }}>
                      Source Code (Zero Boilerplate Tags):
                    </Text>
                    <Code block language="tsx">
{`Card([
  Image("https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500", "100% 160px"),
  Badge("NEW_ARRIVAL", "sm", "", "success"),
  Heading("Modern Minimalist Armchair", 3),
  Text("Designed for comfort with oak frame and stain-resistant fabric.", "sm", "", "secondary"),
  Input("Enter promo code...", "100%", "promo_input"),
  Button("Add_to_Cart", "10px 20px", "buy_btn", "user", "/checkout", "blue"),
  Link("View Product Warranty", "/warranty", "link_warranty", "brand", true)
], "340px")`}
                    </Code>
                  </Box>

                  <div>
                    <Text size="xs" color="muted" weight="bold" style={{ textTransform: "uppercase", marginBottom: "0.75rem" }}>
                      Live Rendered Output:
                    </Text>
                    {Card([
                      Image("https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500", "100% 160px"),
                      <div style={{ margin: "0.5rem 0" }}>{Badge("NEW_ARRIVAL", "sm", "", "success")}</div>,
                      Heading("Modern Minimalist Armchair", 3),
                      Text("Designed for comfort with oak frame and stain-resistant fabric.", "sm", "", "secondary"),
                      <div style={{ margin: "0.75rem 0" }}>{Input("Enter promo code...", "100%", "promo_input")}</div>,
                      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap", marginTop: "0.5rem" }}>
                        {Button("Add_to_Cart", "10px 20px", "buy_btn", "none", "/checkout", "blue")}
                        {Link("View Warranty", "#warranty", "link_warranty", "brand")}
                      </div>
                    ], "340px")}
                  </div>
                </Grid>
              </Card>

              {/* All Simplified Components Showcase */}
              <div>
                <Heading level={2} size="lg" style={{ marginBottom: "0.5rem" }}>
                  All 8 Simplified Components
                </Heading>
                <Text color="secondary" style={{ marginBottom: "1.5rem" }}>
                  Click or test any component below. Every parameter is optional and defaults gracefully.
                </Text>

                <Grid columns={2} gap="1.5rem">
                  {/* 1. BUTTON */}
                  <Card variant="outline" padding="md">
                    <Flex justify="between" align="center" style={{ marginBottom: "0.75rem" }}>
                      <Heading level={4} size="sm">1. Button(...)</Heading>
                      <Badge variant="success" size="xs">Smart Any-Order</Badge>
                    </Flex>
                    <code style={{ fontSize: "0.8rem", color: "#38bdf8", display: "block", marginBottom: "0.75rem" }}>
                      Button("Go to cart", "/cart", "red")  ← No empty quotes needed!
                    </code>
                    <Stack spacing="0.5rem">
                      <Flex gap="0.75rem" align="center" wrap>
                        {Button("Checkout_Now", "/cart", "red")}
                        <Text size="xs" color="muted">Unordered: Label + Path + Red (no empty quotes!)</Text>
                      </Flex>
                      <Flex gap="0.75rem" align="center" wrap>
                        {Button("Save_Changes", "green")}
                        <Text size="xs" color="muted">Direct Color: Label + Green</Text>
                      </Flex>
                      <Flex gap="0.75rem" align="center" wrap>
                        {Button("Go_to_cart", "10px 2px", "ID", "Auth", "/cart", "red", "position", "pointer")}
                        <Text size="xs" color="muted">Classic 8 slots supported too</Text>
                      </Flex>
                      <Flex gap="0.75rem" align="center" wrap>
                        {Button("Simple_Click")}
                        <Text size="xs" color="muted">1 param only</Text>
                      </Flex>
                    </Stack>
                  </Card>


                  {/* 2. INPUT */}
                  <Card variant="outline" padding="md">
                    <Flex justify="between" align="center" style={{ marginBottom: "0.75rem" }}>
                      <Heading level={4} size="sm">2. Input(...)</Heading>
                      <Badge variant="primary" size="xs">8 Optional Slots</Badge>
                    </Flex>
                    <code style={{ fontSize: "0.8rem", color: "#38bdf8", display: "block", marginBottom: "0.75rem" }}>
                      Input(placeholder, boxSize, id, type, label, color, position, pointer)
                    </code>
                    <Stack spacing="0.5rem">
                      {Input("Search_products_or_items...", "100%", "in_1", "text", "Search Catalog")}
                      <Text size="xs" color="muted">With label, placeholder & custom width</Text>
                      {Input("Type your password...", "100%", "in_2", "password")}
                      <Text size="xs" color="muted">Password type shorthand</Text>
                    </Stack>
                  </Card>

                  {/* 3. HEADING */}
                  <Card variant="outline" padding="md">
                    <Flex justify="between" align="center" style={{ marginBottom: "0.75rem" }}>
                      <Heading level={4} size="sm">3. Heading(...)</Heading>
                      <Badge variant="primary" size="xs">6 Optional Slots</Badge>
                    </Flex>
                    <code style={{ fontSize: "0.8rem", color: "#38bdf8", display: "block", marginBottom: "0.75rem" }}>
                      Heading(text, levelOrSize, id, color, align, position)
                    </code>
                    <Stack spacing="0.5rem">
                      {Heading("Gradient_Title_H1", 1, "h_1", "gradient")}
                      {Heading("Subtitle_H3", 3, "h_2", "#38bdf8")}
                      {Heading("Simple_Heading")}
                    </Stack>
                  </Card>

                  {/* 4. TEXT */}
                  <Card variant="outline" padding="md">
                    <Flex justify="between" align="center" style={{ marginBottom: "0.75rem" }}>
                      <Heading level={4} size="sm">4. Text(...)</Heading>
                      <Badge variant="primary" size="xs">6 Optional Slots</Badge>
                    </Flex>
                    <code style={{ fontSize: "0.8rem", color: "#38bdf8", display: "block", marginBottom: "0.75rem" }}>
                      Text(content, size, id, color, align, position)
                    </code>
                    <Stack spacing="0.5rem">
                      {Text("Large primary paragraph with custom size.", "lg", "t_1", "primary")}
                      {Text("Muted small caption text.", "sm", "t_2", "muted")}
                      {Text("Centered brand accent text.", "md", "t_3", "brand", "center")}
                    </Stack>
                  </Card>

                  {/* 5. BADGE */}
                  <Card variant="outline" padding="md">
                    <Flex justify="between" align="center" style={{ marginBottom: "0.75rem" }}>
                      <Heading level={4} size="sm">5. Badge(...)</Heading>
                      <Badge variant="primary" size="xs">5 Optional Slots</Badge>
                    </Flex>
                    <code style={{ fontSize: "0.8rem", color: "#38bdf8", display: "block", marginBottom: "0.75rem" }}>
                      Badge(label, size, id, color, position)
                    </code>
                    <Flex gap="0.75rem" align="center" wrap>
                      {Badge("HOT_SALE", "sm", "b_1", "danger")}
                      {Badge("VERIFIED", "sm", "b_2", "success")}
                      {Badge("PRO_PLAN", "sm", "b_3", "primary")}
                      {Badge("DEFAULT_BADGE")}
                    </Flex>
                  </Card>

                  {/* 6. LINK */}
                  <Card variant="outline" padding="md">
                    <Flex justify="between" align="center" style={{ marginBottom: "0.75rem" }}>
                      <Heading level={4} size="sm">6. Link(...)</Heading>
                      <Badge variant="primary" size="xs">6 Optional Slots</Badge>
                    </Flex>
                    <code style={{ fontSize: "0.8rem", color: "#38bdf8", display: "block", marginBottom: "0.75rem" }}>
                      Link(label, href, id, color, isExternal, position)
                    </code>
                    <Stack spacing="0.5rem">
                      {Link("Visit Google External (auto-opens blank)", "https://google.com", "l_1", "brand", true)}
                      {Link("Internal Dashboard Route", "/dashboard", "l_2", "primary")}
                      {Link("Simple Link")}
                    </Stack>
                  </Card>

                  {/* 7. IMAGE */}
                  <Card variant="outline" padding="md">
                    <Flex justify="between" align="center" style={{ marginBottom: "0.75rem" }}>
                      <Heading level={4} size="sm">7. Image(...)</Heading>
                      <Badge variant="primary" size="xs">6 Optional Slots</Badge>
                    </Flex>
                    <code style={{ fontSize: "0.8rem", color: "#38bdf8", display: "block", marginBottom: "0.75rem" }}>
                      Image(src, boxSize, id, alt, rounded, position)
                    </code>
                    <Flex gap="1rem" align="center">
                      {Image("https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300", "120px 80px", "img_1", "Chair", "md")}
                      {Image("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300", "80px 80px", "img_2", "Avatar", "full")}
                    </Flex>
                  </Card>

                  {/* 8. CARD */}
                  <Card variant="outline" padding="md">
                    <Flex justify="between" align="center" style={{ marginBottom: "0.75rem" }}>
                      <Heading level={4} size="sm">8. Card(...)</Heading>
                      <Badge variant="primary" size="xs">7 Optional Slots</Badge>
                    </Flex>
                    <code style={{ fontSize: "0.8rem", color: "#38bdf8", display: "block", marginBottom: "0.75rem" }}>
                      Card(content, boxSize, id, variant, color, position, pointer)
                    </code>
                    {Card("Ultra simple card with string content & zero configuration!", "100%", "card_str", "glass")}
                  </Card>

                  {/* 9. STACK */}
                  <Card variant="outline" padding="md">
                    <Flex justify="between" align="center" style={{ marginBottom: "0.75rem" }}>
                      <Heading level={4} size="sm">9. Stack(...)</Heading>
                      <Badge variant="success" size="xs">Fluent Chaining</Badge>
                    </Flex>
                    <code style={{ fontSize: "0.8rem", color: "#38bdf8", display: "block", marginBottom: "0.75rem" }}>
                      Stack(Button("1"), Button("2")).row().gap("1rem")
                    </code>
                    {Stack(
                      Button("Item 1").small(),
                      Button("Item 2").small().green(),
                      Button("Item 3").small().outline()
                    ).row().gap("0.75rem")}
                  </Card>

                  {/* 10. GRID */}
                  <Card variant="outline" padding="md">
                    <Flex justify="between" align="center" style={{ marginBottom: "0.75rem" }}>
                      <Heading level={4} size="sm">10. Grid(...)</Heading>
                      <Badge variant="success" size="xs">Columns + Chaining</Badge>
                    </Flex>
                    <code style={{ fontSize: "0.8rem", color: "#38bdf8", display: "block", marginBottom: "0.75rem" }}>
                      Grid(3, [ Card("A"), Card("B"), Card("C") ]).gap("0.75rem")
                    </code>
                    {Grid(3, [
                      Card("Col 1", "100%", "c1", "outline"),
                      Card("Col 2", "100%", "c2", "outline"),
                      Card("Col 3", "100%", "c3", "outline"),
                    ]).gap("0.5rem")}
                  </Card>

                  {/* 11. FLEX */}
                  <Card variant="outline" padding="md">
                    <Flex justify="between" align="center" style={{ marginBottom: "0.75rem" }}>
                      <Heading level={4} size="sm">11. Flex(...)</Heading>
                      <Badge variant="success" size="xs">Auto-Align</Badge>
                    </Flex>
                    <code style={{ fontSize: "0.8rem", color: "#38bdf8", display: "block", marginBottom: "0.75rem" }}>
                      Flex(Button("Back"), Button("Next")).between()
                    </code>
                    {Flex(
                      Button("Previous Step").outline().small(),
                      Button("Next Step").green().small()
                    ).between()}
                  </Card>

                  {/* 12. ALERT */}
                  <Card variant="outline" padding="md">
                    <Flex justify="between" align="center" style={{ marginBottom: "0.75rem" }}>
                      <Heading level={4} size="sm">12. Alert(...)</Heading>
                      <Badge variant="success" size="xs">Variant Chaining</Badge>
                    </Flex>
                    <code style={{ fontSize: "0.8rem", color: "#38bdf8", display: "block", marginBottom: "0.75rem" }}>
                      Alert("Your order is confirmed!").success()
                    </code>
                    {Alert("Your payment was processed successfully!").success()}
                  </Card>

                  {/* 13. DIVIDER */}
                  <Card variant="outline" padding="md">
                    <Flex justify="between" align="center" style={{ marginBottom: "0.75rem" }}>
                      <Heading level={4} size="sm">13. Divider()</Heading>
                      <Badge variant="primary" size="xs">Zero Params</Badge>
                    </Flex>
                    <code style={{ fontSize: "0.8rem", color: "#38bdf8", display: "block", marginBottom: "0.75rem" }}>
                      Divider() or Divider("dashed")
                    </code>
                    <Stack spacing="0.75rem">
                      <Text size="xs" color="muted">Solid Divider:</Text>
                      {Divider()}
                      <Text size="xs" color="muted">Dashed Divider:</Text>
                      {Divider("dashed")}
                    </Stack>
                  </Card>

                  {/* 14. NAVBAR & FOOTER */}
                  <Card variant="outline" padding="md">
                    <Flex justify="between" align="center" style={{ marginBottom: "0.75rem" }}>
                      <Heading level={4} size="sm">14. Navbar(...) & Footer(...)</Heading>
                      <Badge variant="success" size="xs">Complete Layout</Badge>
                    </Flex>
                    <code style={{ fontSize: "0.8rem", color: "#38bdf8", display: "block", marginBottom: "0.75rem" }}>
                      Navbar("My Brand", ["Home", "Products", "Cart"])
                    </code>
                    <Box padding="0.75rem" background="var(--cr-bg-surface-hover)" borderRadius="8px">
                      {Navbar("ShopNow", ["Catalog", "Cart"], Button("Sign In").small().blue())}
                      {Footer("© 2026 ShopNow", ["Privacy", "Terms"])}
                    </Box>
                  </Card>

                  {/* 15. SEARCH INPUT */}
                  <Card variant="outline" padding="md">
                    <Flex justify="between" align="center" style={{ marginBottom: "0.75rem" }}>
                      <Heading level={4} size="sm">15. SearchInput(...)</Heading>
                      <Badge variant="success" size="xs">Debounced</Badge>
                    </Flex>
                    <code style={{ fontSize: "0.8rem", color: "#38bdf8", display: "block", marginBottom: "0.75rem" }}>
                      SearchInput("Find files...").shortcut("Ctrl+K").width("100%")
                    </code>
                    {SearchInput("Search library components...").shortcut("Ctrl+K").width("100%")}
                  </Card>

                  {/* 16. OTP INPUT */}
                  <Card variant="outline" padding="md">
                    <Flex justify="between" align="center" style={{ marginBottom: "0.75rem" }}>
                      <Heading level={4} size="sm">16. OTPInput(...)</Heading>
                      <Badge variant="primary" size="xs">Auto-Focus</Badge>
                    </Flex>
                    <code style={{ fontSize: "0.8rem", color: "#38bdf8", display: "block", marginBottom: "0.75rem" }}>
                      OTPInput(6).onComplete(code =&gt; ...)
                    </code>
                    <Flex justify="center">{OTPInput(6)}</Flex>
                  </Card>

                  {/* 17. RATING */}
                  <Card variant="outline" padding="md">
                    <Flex justify="between" align="center" style={{ marginBottom: "0.75rem" }}>
                      <Heading level={4} size="sm">17. Rating(...)</Heading>
                      <Badge variant="warning" size="xs">Interactive</Badge>
                    </Flex>
                    <code style={{ fontSize: "0.8rem", color: "#38bdf8", display: "block", marginBottom: "0.75rem" }}>
                      Rating(4.5).readOnly() or Rating(5)
                    </code>
                    <Flex align="center" gap="1rem">
                      {Rating(4)}
                      <Text size="xs" color="muted">Interactive 5-star rating</Text>
                    </Flex>
                  </Card>

                  {/* 18. LABEL */}
                  <Card variant="outline" padding="md">
                    <Flex justify="between" align="center" style={{ marginBottom: "0.75rem" }}>
                      <Heading level={4} size="sm">18. Label(...)</Heading>
                      <Badge variant="primary" size="xs">Accessible</Badge>
                    </Flex>
                    <code style={{ fontSize: "0.8rem", color: "#38bdf8", display: "block", marginBottom: "0.75rem" }}>
                      Label("Work Email").required()
                    </code>
                    <Stack spacing="0.25rem">
                      {Label("Corporate Email Address").required()}
                      {Input("name@company.com").email()}
                    </Stack>
                  </Card>

                  {/* 19. COMBOBOX & MULTISELECT */}
                  <Card variant="outline" padding="md">
                    <Flex justify="between" align="center" style={{ marginBottom: "0.75rem" }}>
                      <Heading level={4} size="sm">19. Combobox & MultiSelect</Heading>
                      <Badge variant="success" size="xs">Filterable</Badge>
                    </Flex>
                    <code style={{ fontSize: "0.8rem", color: "#38bdf8", display: "block", marginBottom: "0.75rem" }}>
                      Combobox(["React", "Vue", "Svelte"])
                    </code>
                    <Stack spacing="0.5rem">
                      {Combobox(["TypeScript", "React", "Next.js", "Tailwind", "Vite"], "Select tech stack...")}
                      {MultiSelect(["Frontend", "Backend", "Fullstack", "DevOps", "AI/ML"], "Select roles...")}
                    </Stack>
                  </Card>

                  {/* 20. COLOR PICKER */}
                  <Card variant="outline" padding="md">
                    <Flex justify="between" align="center" style={{ marginBottom: "0.75rem" }}>
                      <Heading level={4} size="sm">20. ColorPicker(...)</Heading>
                      <Badge variant="primary" size="xs">Palette Presets</Badge>
                    </Flex>
                    <code style={{ fontSize: "0.8rem", color: "#38bdf8", display: "block", marginBottom: "0.75rem" }}>
                      ColorPicker("#6366f1")
                    </code>
                    {ColorPicker("#6366f1")}
                  </Card>

                  {/* 21. STEPPER & TIMELINE */}
                  <Card variant="outline" padding="md">
                    <Flex justify="between" align="center" style={{ marginBottom: "0.75rem" }}>
                      <Heading level={4} size="sm">21. Stepper & Timeline</Heading>
                      <Badge variant="success" size="xs">Progress</Badge>
                    </Flex>
                    <code style={{ fontSize: "0.8rem", color: "#38bdf8", display: "block", marginBottom: "0.75rem" }}>
                      Stepper(["Cart", "Shipping", "Pay"]).active(1)
                    </code>
                    <Stack spacing="0.75rem">
                      {Stepper(["Cart", "Shipping", "Payment"]).active(1)}
                      {Timeline([
                        { title: "Order Confirmed", timestamp: "10:30 AM", status: "completed" },
                        { title: "Out for Delivery", timestamp: "11:45 AM", status: "current" },
                      ]).dense()}
                    </Stack>
                  </Card>

                  {/* 22. SCROLLAREA & COLLAPSIBLE */}
                  <Card variant="outline" padding="md">
                    <Flex justify="between" align="center" style={{ marginBottom: "0.75rem" }}>
                      <Heading level={4} size="sm">22. ScrollArea & Collapsible</Heading>
                      <Badge variant="primary" size="xs">Containers</Badge>
                    </Flex>
                    <code style={{ fontSize: "0.8rem", color: "#38bdf8", display: "block", marginBottom: "0.75rem" }}>
                      ScrollArea("120px", content)
                    </code>
                    <Stack spacing="0.5rem">
                      {Collapsible("Frequently Asked Questions", Text("Criation UI supports both standard React JSX and English-like function calls.").muted())}
                    </Stack>
                  </Card>
                </Grid>
              </div>

              {/* Live Interactive Playground */}
              <Card variant="glass" padding="lg">
                <Heading level={3} size="md" style={{ marginBottom: "0.5rem" }}>
                  Interactive Live Shorthand Playground (All Components Supported)
                </Heading>
                <Text size="sm" color="secondary" style={{ marginBottom: "1rem" }}>
                  Edit the text below with <code>Heading</code>, <code>Text</code>, <code>Badge</code>, <code>Input</code>, <code>Button</code>, <code>Link</code>, or <code>Image</code>. Everything updates live!
                </Text>

                <TextArea
                  rows={7}
                  value={dslInput}
                  onChange={(e) => setDslInput(e.target.value)}
                  style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.9rem", marginBottom: "1rem" }}
                />

                <Box padding="1.5rem" background="var(--cr-bg-surface-hover)" borderRadius="12px">
                  <Text size="xs" color="muted" weight="bold" style={{ textTransform: "uppercase", marginBottom: "0.75rem" }}>
                    Live Sandbox Output:
                  </Text>
                  <Criation>{dslInput}</Criation>
                </Box>
              </Card>

              {/* Shorthand Reference Cheatsheet */}
              <Card variant="outline" padding="md">
                <Heading level={4} size="sm" style={{ marginBottom: "1rem" }}>
                  Complete Positional Parameter Reference (All Optional)
                </Heading>
                <Table hoverable compact>
                  <thead>
                    <tr>
                      <th>Component</th>
                      <th>Slot 1</th>
                      <th>Slot 2</th>
                      <th>Slot 3</th>
                      <th>Slot 4</th>
                      <th>Slot 5</th>
                      <th>Slot 6</th>
                      <th>Slot 7</th>
                      <th>Slot 8</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Button</strong></td>
                      <td><code>class / label</code></td>
                      <td><code>box size</code></td>
                      <td><code>ID</code></td>
                      <td><code>Auth</code></td>
                      <td><code>path_direction</code></td>
                      <td><code>color</code></td>
                      <td><code>position</code></td>
                      <td><code>pointer</code></td>
                    </tr>
                    <tr>
                      <td><strong>Input</strong></td>
                      <td><code>placeholder</code></td>
                      <td><code>box size</code></td>
                      <td><code>ID</code></td>
                      <td><code>type</code></td>
                      <td><code>label</code></td>
                      <td><code>color</code></td>
                      <td><code>position</code></td>
                      <td><code>pointer</code></td>
                    </tr>
                    <tr>
                      <td><strong>Heading</strong></td>
                      <td><code>text</code></td>
                      <td><code>level / size</code></td>
                      <td><code>ID</code></td>
                      <td><code>color</code></td>
                      <td><code>align</code></td>
                      <td><code>position</code></td>
                      <td>—</td>
                      <td>—</td>
                    </tr>
                    <tr>
                      <td><strong>Text</strong></td>
                      <td><code>content</code></td>
                      <td><code>size</code></td>
                      <td><code>ID</code></td>
                      <td><code>color</code></td>
                      <td><code>align</code></td>
                      <td><code>position</code></td>
                      <td>—</td>
                      <td>—</td>
                    </tr>
                    <tr>
                      <td><strong>Badge</strong></td>
                      <td><code>label</code></td>
                      <td><code>size</code></td>
                      <td><code>ID</code></td>
                      <td><code>color</code></td>
                      <td><code>position</code></td>
                      <td>—</td>
                      <td>—</td>
                      <td>—</td>
                    </tr>
                    <tr>
                      <td><strong>Card</strong></td>
                      <td><code>content</code></td>
                      <td><code>box size</code></td>
                      <td><code>ID</code></td>
                      <td><code>variant</code></td>
                      <td><code>color</code></td>
                      <td><code>position</code></td>
                      <td><code>pointer</code></td>
                      <td>—</td>
                    </tr>
                    <tr>
                      <td><strong>Link</strong></td>
                      <td><code>label</code></td>
                      <td><code>href / path</code></td>
                      <td><code>ID</code></td>
                      <td><code>color</code></td>
                      <td><code>isExternal</code></td>
                      <td><code>position</code></td>
                      <td>—</td>
                      <td>—</td>
                    </tr>
                    <tr>
                      <td><strong>Image</strong></td>
                      <td><code>src</code></td>
                      <td><code>box size</code></td>
                      <td><code>ID</code></td>
                      <td><code>alt</code></td>
                      <td><code>rounded</code></td>
                      <td><code>position</code></td>
                      <td>—</td>
                      <td>—</td>
                    </tr>
                  </tbody>
                </Table>
              </Card>

              {/* How to use in other files */}
              <Card variant="glass" padding="lg">
                <Heading level={3} size="md" style={{ marginBottom: "1rem" }}>
                  How to Use in Any Other Website File
                </Heading>
                <Tabs
                  variant="pills"
                  items={[
                    {
                      id: "tab-fn",
                      label: "1. Direct 1-Line Calls (Any Order!)",
                      content: (
                        <Code block copyable language="tsx">
{`import { Heading, Text, Input, Button, Badge, Link } from "@criation/ui";

export default function CartPage() {
  return (
    <div>
      {/* Zero HTML tags needed! Unordered smart parameters */}
      {Heading("Shopping Cart", 1, "gradient")}
      {Text("Review your selected items before checkout", "muted")}
      {Badge("2 ITEMS", "success")}
      {Input("Enter voucher code...", "300px")}
      {Button("Proceed to Payment", "/payment", "green")}
      {Link("Return to Store", "/products")}
    </div>
  );
}`}
                        </Code>
                      ),
                    },
                    {
                      id: "tab-mount",
                      label: "2. Entire Website Mount (main.tsx in 1 Line)",
                      content: (
                        <Code block copyable language="tsx">
{`import { renderWebsite, Heading, Button } from "@criation/ui";

// Mount your entire website without ReactDOM or boilerplate:
renderWebsite([
  Heading("My Personal Store", 1, "gradient"),
  Button("Explore Products", "/products", "blue")
]);`}
                        </Code>
                      ),
                    },
                    {
                      id: "tab-dsl",
                      label: "3. Using <Criation> Template Component",
                      content: (
                        <Code block copyable language="tsx">
{`import { Criation } from "@criation/ui";

export default function StorePage() {
  return (
    <Criation>
      {\`Heading = "Welcome_to_Store", 1, "title", "gradient"
Input = "Search products...", "320px", "search_box"
Button = "Go_to_cart", "/cart", "red"\`}
    </Criation>
  );
}`}
                        </Code>
                      ),
                    },
                  ]}
                />

              </Card>
            </Stack>
          )}

          {/* SECTION: OVERVIEW */}
          {activeTab === "overview" && (
            <Stack spacing="2.5rem">
              <div>
                <Heading level={1} size="2xl" gradient>
                  Build beautiful websites with Criation UI
                </Heading>
                <Text size="lg" color="secondary" style={{ marginTop: "0.75rem", maxWidth: "700px" }}>
                  A personal, production-ready React + TypeScript UI foundation with clean separation
                  of concerns: UI properties, layout primitives, decoupled authentication, and routing modules.
                </Text>
              </div>

              {/* Stats showcase */}
              <Grid columns={4} gap="1.5rem">
                <StatCard title="Ready Components" value="40+" change={24} icon={<Layers size={20} color="#6366f1" />} />
                <StatCard title="Design Tokens" value="60+" icon={<Sparkles size={20} color="#38bdf8" />} />
                <StatCard title="TypeScript Coverage" value="100%" icon={<Shield size={20} color="#34d399" />} />
                <StatCard title="Bundle Footprint" value="Zero Bulky Deps" icon={<Zap size={20} color="#f59e0b" />} />
              </Grid>

              {/* Architecture highlights */}
              <Card variant="glass" padding="lg">
                <Heading level={3} size="md" style={{ marginBottom: "1rem" }}>
                  Unified Architecture & Separation of Concerns
                </Heading>
                <Grid columns={2} gap="1.5rem">
                  <Box padding="1rem" background="var(--cr-bg-surface-hover)" borderRadius="12px">
                    <Heading level={4} size="sm" style={{ color: "var(--cr-primary)" }}>
                      1. Pure UI Components
                    </Heading>
                    <Text size="sm" color="secondary" style={{ marginTop: "0.5rem" }}>
                      Properties like <code>className</code>, <code>size</code>, <code>color</code>, <code>position</code>,
                      and <code>cursor</code> belong strictly to component rendering.
                    </Text>
                  </Box>
                  <Box padding="1rem" background="var(--cr-bg-surface-hover)" borderRadius="12px">
                    <Heading level={4} size="sm" style={{ color: "var(--cr-secondary)" }}>
                      2. Decoupled Auth & Routing
                    </Heading>
                    <Text size="sm" color="secondary" style={{ marginTop: "0.5rem" }}>
                      <code>AuthGuard</code>, <code>AuthProvider</code>, and <code>ProtectedRoute</code> allow you to plug in
                      any auth backend (Supabase, Firebase, NextAuth, custom JWT) without rewriting UI.
                    </Text>
                  </Box>
                </Grid>
              </Card>

              {/* Quick start code */}
              <div>
                <Heading level={3} size="sm" style={{ marginBottom: "0.75rem" }}>
                  Quick Start Usage
                </Heading>
                <Code block copyable language="tsx">
{`import { Button, TextInput, Card, ThemeProvider } from "@criation/ui";
import "@criation/ui/styles.css";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Card variant="glass">
        <TextInput placeholder="Enter your email" />
        <Button variant="primary" onClick={() => alert("Ready!")}>
          Launch Project
        </Button>
      </Card>
    </ThemeProvider>
  );
}`}
                </Code>
              </div>
            </Stack>
          )}

          {/* SECTION: BUTTONS */}
          {activeTab === "buttons" && (
            <Stack spacing="2rem">
              <div>
                <Heading level={2} size="xl">Buttons & Actions</Heading>
                <Text color="secondary">Standardized variants, sizes, icon combinations, loading states, and grouped actions.</Text>
              </div>

              {/* Controls */}
              <Card variant="outline" padding="sm">
                <Flex align="center" justify="between" wrap>
                  <Flex align="center" gap="1rem">
                    <Text size="sm" weight="semibold">Size:</Text>
                    {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
                      <Button
                        key={s}
                        size="xs"
                        variant={btnSize === s ? "primary" : "outline"}
                        onClick={() => setBtnSize(s)}
                      >
                        {s.toUpperCase()}
                      </Button>
                    ))}
                  </Flex>
                  <Flex align="center" gap="1rem">
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={() => setBtnLoading((prev) => !prev)}
                    >
                      {btnLoading ? "Stop Loading" : "Toggle Loading State"}
                    </Button>
                  </Flex>
                </Flex>
              </Card>

              {/* Variants */}
              <Card variant="glass" padding="lg">
                <Heading level={4} size="sm" style={{ marginBottom: "1rem" }}>Button Variants</Heading>
                <Flex gap="1rem" wrap align="center">
                  <Button variant="primary" size={btnSize} loading={btnLoading}>Primary</Button>
                  <Button variant="secondary" size={btnSize} loading={btnLoading}>Secondary</Button>
                  <Button variant="outline" size={btnSize} loading={btnLoading}>Outline</Button>
                  <Button variant="ghost" size={btnSize} loading={btnLoading}>Ghost</Button>
                  <Button variant="success" size={btnSize} loading={btnLoading}>Success</Button>
                  <Button variant="danger" size={btnSize} loading={btnLoading}>Danger</Button>
                  <Button variant="primary" size={btnSize} disabled>Disabled</Button>
                </Flex>
              </Card>

              {/* Icon Buttons & Button Groups */}
              <Grid columns={2} gap="1.5rem">
                <Card variant="glass" padding="md">
                  <Heading level={4} size="sm" style={{ marginBottom: "1rem" }}>Icon Buttons</Heading>
                  <Flex gap="0.75rem" align="center">
                    <IconButton icon={<Heart size={16} />} aria-label="Like" variant="outline" />
                    <IconButton icon={<Send size={16} />} aria-label="Send" variant="primary" />
                    <IconButton icon={<Settings size={16} />} aria-label="Settings" variant="secondary" isRound />
                    <IconButton icon={<Bell size={16} />} aria-label="Notifications" variant="ghost" isRound />
                  </Flex>
                </Card>

                <Card variant="glass" padding="md">
                  <Heading level={4} size="sm" style={{ marginBottom: "1rem" }}>Button Group (Attached)</Heading>
                  <ButtonGroup attached>
                    <Button variant="outline">Left</Button>
                    <Button variant="outline">Middle</Button>
                    <Button variant="outline">Right</Button>
                  </ButtonGroup>
                </Card>
              </Grid>

              {/* Code Snippet */}
              <div>
                <Heading level={4} size="xs" style={{ marginBottom: "0.5rem" }}>Button Code Example</Heading>
                <Code block copyable language="tsx">
{`<Button
  variant="primary"
  size="md"
  leftIcon={<Send size={16} />}
  loading={false}
  onClick={() => console.log("Clicked")}
>
  Send Message
</Button>`}
                </Code>
              </div>
            </Stack>
          )}

          {/* SECTION: INPUTS & FORMS */}
          {activeTab === "inputs" && (
            <Stack spacing="2rem">
              <div>
                <Heading level={2} size="xl">Inputs & Form Controls</Heading>
                <Text color="secondary">Accessible input fields, password reveals, selects, toggles, sliders, and upload zones.</Text>
              </div>

              <Grid columns={2} gap="1.5rem">
                <Card variant="glass" padding="lg">
                  <Form spacing="1.25rem">
                    <FormField label="Email Address" required hint="We'll never share your email with anyone else.">
                      <EmailInput
                        placeholder="you@domain.com"
                        value={sampleEmail}
                        onChange={(e) => setSampleEmail(e.target.value)}
                        isClearable
                        onClear={() => setSampleEmail("")}
                      />
                    </FormField>

                    <FormField label="Secure Password" required hint="Must be at least 8 characters.">
                      <PasswordInput
                        placeholder="••••••••"
                        value={samplePassword}
                        onChange={(e) => setSamplePassword(e.target.value)}
                      />
                    </FormField>

                    <FormField label="Select Framework">
                      <Select
                        placeholder="Choose a platform..."
                        options={[
                          { value: "react", label: "React" },
                          { value: "nextjs", label: "Next.js" },
                          { value: "vite", label: "Vite" },
                          { value: "vue", label: "Vue" },
                        ]}
                      />
                    </FormField>

                    <FormField label="Notes / Description">
                      <TextArea placeholder="Tell us about your project..." rows={3} />
                    </FormField>
                  </Form>
                </Card>

                <Stack spacing="1.5rem">
                  <Card variant="glass" padding="lg">
                    <Heading level={4} size="sm" style={{ marginBottom: "1rem" }}>Interactive Switches & Toggles</Heading>
                    <Stack spacing="1rem">
                      <Switch
                        label="Enable Notifications"
                        description="Receive instant alerts for important updates"
                        checked={sampleSwitch}
                        onChange={(e) => setSampleSwitch(e.target.checked)}
                      />
                      <Checkbox
                        label="Accept Terms & Conditions"
                        description="I agree to the privacy policy and terms"
                        checked={sampleCheckbox}
                        onChange={(e) => setSampleCheckbox(e.target.checked)}
                      />
                      <Flex gap="1.5rem">
                        <Radio
                          name="sample-radio"
                          label="Option A"
                          checked={sampleRadio === "option1"}
                          onChange={() => setSampleRadio("option1")}
                        />
                        <Radio
                          name="sample-radio"
                          label="Option B"
                          checked={sampleRadio === "option2"}
                          onChange={() => setSampleRadio("option2")}
                        />
                      </Flex>
                    </Stack>
                  </Card>

                  <Card variant="glass" padding="lg">
                    <Heading level={4} size="sm" style={{ marginBottom: "1rem" }}>Slider & Date Picker</Heading>
                    <Stack spacing="1.25rem">
                      <div>
                        <Text size="sm" weight="semibold" style={{ marginBottom: "0.5rem" }}>
                          Volume / Intensity: {sampleSlider}%
                        </Text>
                        <Slider
                          min={0}
                          max={100}
                          value={sampleSlider}
                          showValue
                          onChange={(e) => setSampleSlider(Number(e.target.value))}
                        />
                      </div>
                      <DatePicker />
                    </Stack>
                  </Card>
                </Stack>
              </Grid>

              {/* File Upload Component */}
              <Card variant="glass" padding="lg">
                <Heading level={4} size="sm" style={{ marginBottom: "1rem" }}>Drag & Drop File Upload</Heading>
                <FileUpload onFilesSelected={(files) => toast.info(`Selected ${files?.length || 0} file(s)`)} />
              </Card>
            </Stack>
          )}

          {/* SECTION: LAYOUT & BOX */}
          {activeTab === "layout" && (
            <Stack spacing="2rem">
              <div>
                <Heading level={2} size="xl">Layout & Box Primitives</Heading>
                <Text color="secondary">
                  The fundamental structural primitives: <code>Box</code> (polymorphic container supporting position, cursor, background, padding),
                  <code>Container</code>, <code>Stack</code>, <code>Flex</code>, and <code>Grid</code>.
                </Text>
              </div>

              {/* Box demonstration */}
              <Card variant="glass" padding="lg">
                <Heading level={4} size="sm" style={{ marginBottom: "1rem" }}>
                  Polymorphic Box with Standard Dimensions & Pointer
                </Heading>
                <Box
                  padding="1.5rem"
                  background="linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(56, 189, 248, 0.2))"
                  borderColor="var(--cr-primary)"
                  borderWidth={1}
                  borderRadius="16px"
                  cursor="pointer"
                  onClick={() => toast.success("Box clicked!", "Box Interaction")}
                >
                  <Text weight="semibold" color="brand">Clickable Box Primitive</Text>
                  <Text size="sm" color="secondary" style={{ marginTop: "4px" }}>
                    Hover over this box — notice the pointer cursor, custom padding, background gradient, and border styling!
                  </Text>
                </Box>
              </Card>

              {/* Grid & Flex showcase */}
              <Card variant="glass" padding="lg">
                <Heading level={4} size="sm" style={{ marginBottom: "1rem" }}>Responsive Grid Layout</Heading>
                <Grid columns={3} gap="1rem">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <Box
                      key={num}
                      padding="1.25rem"
                      background="var(--cr-bg-surface-hover)"
                      borderRadius="8px"
                      display="flex"
                      align="center"
                      justify="center"
                    >
                      <Text weight="semibold">Grid Column #{num}</Text>
                    </Box>
                  ))}
                </Grid>
              </Card>
            </Stack>
          )}

          {/* SECTION: DATA DISPLAY */}
          {activeTab === "data" && (
            <Stack spacing="2rem">
              <div>
                <Heading level={2} size="xl">Data Display Components</Heading>
                <Text color="secondary">Cards, Badges, Avatars, Accordions, and Data Tables.</Text>
              </div>

              {/* Badges & Avatars */}
              <Grid columns={2} gap="1.5rem">
                <Card variant="glass" padding="md">
                  <Heading level={4} size="sm" style={{ marginBottom: "1rem" }}>Badges & Status</Heading>
                  <Flex gap="0.5rem" wrap>
                    <Badge variant="primary">Active</Badge>
                    <Badge variant="success" dot>Completed</Badge>
                    <Badge variant="warning" dot>Pending</Badge>
                    <Badge variant="danger" dot>Failed</Badge>
                    <Badge variant="secondary">Pro Plan</Badge>
                  </Flex>
                </Card>

                <Card variant="glass" padding="md">
                  <Heading level={4} size="sm" style={{ marginBottom: "1rem" }}>Avatars & Status</Heading>
                  <Flex gap="1rem" align="center">
                    <Avatar name="Sarah Connor" size="lg" status="online" />
                    <Avatar name="Alex Rivera" size="md" status="busy" />
                    <Avatar size="sm" />
                  </Flex>
                </Card>
              </Grid>

              {/* Data Table */}
              <Card variant="glass" padding="md">
                <Heading level={4} size="sm" style={{ marginBottom: "1rem" }}>Table</Heading>
                <Table hoverable striped>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Flex align="center" gap="0.75rem">
                          <Avatar name="Elena Rostova" size="sm" />
                          <div>
                            <div style={{ fontWeight: 600 }}>Elena Rostova</div>
                            <div style={{ fontSize: "0.75rem", color: "var(--cr-text-muted)" }}>elena@example.com</div>
                          </div>
                        </Flex>
                      </td>
                      <td>Lead Designer</td>
                      <td><Badge variant="success" size="xs">Active</Badge></td>
                      <td><Button size="xs" variant="ghost">Edit</Button></td>
                    </tr>
                    <tr>
                      <td>
                        <Flex align="center" gap="0.75rem">
                          <Avatar name="Marcus Vance" size="sm" />
                          <div>
                            <div style={{ fontWeight: 600 }}>Marcus Vance</div>
                            <div style={{ fontSize: "0.75rem", color: "var(--cr-text-muted)" }}>marcus@example.com</div>
                          </div>
                        </Flex>
                      </td>
                      <td>DevOps Engineer</td>
                      <td><Badge variant="primary" size="xs">Invited</Badge></td>
                      <td><Button size="xs" variant="ghost">Edit</Button></td>
                    </tr>
                  </tbody>
                </Table>
              </Card>

              {/* Accordion */}
              <Card variant="glass" padding="md">
                <Heading level={4} size="sm" style={{ marginBottom: "1rem" }}>Accordion FAQ</Heading>
                <Accordion
                  items={[
                    {
                      id: "faq-1",
                      title: "How do I install Criation UI in another project?",
                      content: "Install via npm install @criation/ui and import the styles in your main entry file.",
                    },
                    {
                      id: "faq-2",
                      title: "Is it customizable with design tokens?",
                      content: "Yes! All colors, shadows, borders, and typography are defined via CSS custom properties.",
                    },
                  ]}
                />
              </Card>
            </Stack>
          )}

          {/* SECTION: FEEDBACK & OVERLAYS */}
          {activeTab === "feedback" && (
            <Stack spacing="2rem">
              <div>
                <Heading level={2} size="xl">Feedback & Overlays</Heading>
                <Text color="secondary">Alerts, Toasts, Modals, Drawers, Spinners, Skeletons, and Empty States.</Text>
              </div>

              {/* Alerts */}
              <Stack spacing="1rem">
                <Alert variant="info" title="System Update Available" dismissible>
                  Version 0.2.0 includes major performance enhancements and new chart primitives.
                </Alert>
                <Alert variant="success" title="Changes Saved" dismissible>
                  Your profile and preferences have been synchronized.
                </Alert>
                <Alert variant="warning" title="Storage Quota Warning">
                  You are approaching 85% of your cloud storage limit.
                </Alert>
              </Stack>

              {/* Overlays Triggers */}
              <Card variant="glass" padding="lg">
                <Heading level={4} size="sm" style={{ marginBottom: "1rem" }}>Interactive Overlays</Heading>
                <Flex gap="1rem" wrap>
                  <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                    Open Modal Dialog
                  </Button>
                  <Button variant="outline" onClick={() => setIsDrawerOpen(true)}>
                    Open Slide-in Drawer
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => toast.success("Toast message triggered successfully!", "Notification")}
                  >
                    Trigger Toast Notification
                  </Button>
                  <Tooltip label="I'm an accessible tooltip!">
                    <Button variant="ghost">Hover for Tooltip</Button>
                  </Tooltip>
                </Flex>
              </Card>

              {/* Modal Dialog Instance */}
              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Confirm Project Deployment"
                footer={
                  <>
                    <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    <Button variant="primary" onClick={() => { setIsModalOpen(false); toast.success("Project deployed!"); }}>
                      Deploy Now
                    </Button>
                  </>
                }
              >
                <Text color="secondary">
                  Are you sure you want to deploy this website configuration to production?
                  This will publish all current UI tokens and routes live.
                </Text>
              </Modal>

              {/* Drawer Instance */}
              <Drawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                title="Quick Configuration"
                placement="right"
                footer={<Button fullWidth variant="primary" onClick={() => setIsDrawerOpen(false)}>Save Settings</Button>}
              >
                <Stack spacing="1.25rem">
                  <Text size="sm" color="secondary">
                    Configure your website environment variables and feature flags.
                  </Text>
                  <Switch label="Enable Real-Time Collaboration" />
                  <Switch label="Automated Backups" checked />
                  <Divider />
                  <FormField label="Environment Name">
                    <TextInput defaultValue="Production (US-East)" />
                  </FormField>
                </Stack>
              </Drawer>

              {/* Skeletons & Spinners */}
              <Card variant="glass" padding="md">
                <Heading level={4} size="sm" style={{ marginBottom: "1rem" }}>Spinners & Skeletons</Heading>
                <Grid columns={2} gap="2rem">
                  <Flex align="center" gap="1.5rem">
                    <Spinner size="sm" />
                    <Spinner size="md" />
                    <Spinner size="lg" />
                  </Flex>
                  <Stack spacing="0.75rem">
                    <Skeleton height="1.5rem" width="60%" />
                    <Skeleton height="1rem" width="100%" />
                    <Skeleton height="1rem" width="80%" />
                  </Stack>
                </Grid>
              </Card>
            </Stack>
          )}

          {/* SECTION: PAGE TEMPLATES */}
          {activeTab === "templates" && (
            <Stack spacing="2rem">
              <div>
                <Heading level={2} size="xl">Pre-Built Page Templates</Heading>
                <Text color="secondary">Ready-to-use production scaffolding: Landing Page, Dashboard, Auth & Settings.</Text>
              </div>

              <Grid columns={2} gap="1.5rem">
                <Card variant="glass" padding="lg">
                  <Heading level={4} size="md" style={{ color: "var(--cr-primary)" }}>LandingLayout</Heading>
                  <Text size="sm" color="secondary" style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>
                    Includes sticky glass navbar, customizable hero section with call-to-action buttons, features grid, and footer.
                  </Text>
                  <Code block language="tsx">
{`<LandingLayout
  brand={<Logo />}
  hero={<HeroContent />}
  footer={<FooterLinks />}
>
  <FeaturesSection />
</LandingLayout>`}
                  </Code>
                </Card>

                <Card variant="glass" padding="lg">
                  <Heading level={4} size="md" style={{ color: "var(--cr-secondary)" }}>DashboardLayout</Heading>
                  <Text size="sm" color="secondary" style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>
                    Features collapsible sidebar navigation, top search/actions header, and scrollable content canvas.
                  </Text>
                  <Code block language="tsx">
{`<DashboardLayout
  brand="MyApp"
  sidebarItems={navLinks}
  userProfile={<UserProfileBadge />}
>
  <DashboardMetrics />
</DashboardLayout>`}
                  </Code>
                </Card>
              </Grid>
            </Stack>
          )}

          {/* SECTION: AUTH & ROUTING */}
          {activeTab === "auth" && (
            <Stack spacing="2rem">
              <div>
                <Heading level={2} size="xl">Decoupled Auth & Routing</Heading>
                <Text color="secondary">
                  Keeping authentication and routing separate from UI components makes your library reusable across any stack!
                </Text>
              </div>

              <Card variant="glass" padding="lg">
                <Heading level={4} size="sm" style={{ marginBottom: "1rem" }}>
                  How to Protect Routes Without Vendor Lock-in
                </Heading>
                <Code block copyable language="tsx">
{`import { AuthProvider, ProtectedRoute, AuthGuard } from "@criation/ui";

// 1. Wrap your application with the AuthProvider
<AuthProvider
  onLogin={async (credentials) => {
    const res = await api.post("/login", credentials);
    return { user: res.data.user, token: res.data.token };
  }}
>
  {/* 2. Protect specific routes */}
  <ProtectedRoute allowedRoles={["admin", "editor"]}>
    <DashboardPage />
  </ProtectedRoute>

  {/* 3. Conditionally render UI inside components */}
  <AuthGuard requiredRole="admin" fallback={<p>Admin only</p>}>
    <DeleteButton />
  </AuthGuard>
</AuthProvider>`}
                </Code>
              </Card>
            </Stack>
          )}
        </main>
      </div>
    </div>
  );
}
