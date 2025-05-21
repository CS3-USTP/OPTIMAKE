<script lang="ts">
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import { useSidebar } from "$lib/components/ui/sidebar/index.js";
	import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
	import PlusIcon from "@lucide/svelte/icons/plus";

	// This should be `Component` after @lucide/svelte updates types
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let { workspaces }: { workspaces: { name: string; logo: any; plan: string }[] } = $props();
	const sidebar = useSidebar();

	let activeWorkspace = $state(workspaces[0]);
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						{...props}
						size="lg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer select-none">
						<div
							class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
							<activeWorkspace.logo class="size-4" />
						</div>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-medium">
								{activeWorkspace.name}
							</span>
							<span class="truncate text-xs">{activeWorkspace.plan}</span>
						</div>
						<ChevronsUpDownIcon class="ml-auto" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg"
				align="start"
				side={sidebar.isMobile ? "bottom" : "right"}
				sideOffset={4}>
				<DropdownMenu.Label class="text-muted-foreground cursor-default text-xs select-none"
					>Workspaces</DropdownMenu.Label>
				{#each workspaces as workspace, index (workspace.name)}
					<DropdownMenu.Item onSelect={() => (activeWorkspace = workspace)} class="cursor-pointer gap-2 p-2">
						<div class="flex size-6 items-center justify-center rounded-md border">
							<workspace.logo class="size-3.5 shrink-0" />
						</div>
						{workspace.name}
						<DropdownMenu.Shortcut>⌘{index + 1}</DropdownMenu.Shortcut>
					</DropdownMenu.Item>
				{/each}
				<DropdownMenu.Separator />
				<DropdownMenu.Item class="cursor-pointer gap-2 p-2">
					<div class="flex size-6 items-center justify-center rounded-md border bg-transparent">
						<PlusIcon class="size-4" />
					</div>
					<div class="text-muted-foreground font-medium">New Workspace</div>
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
