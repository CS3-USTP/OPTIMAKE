<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import * as Avatar from "$lib/components/ui/avatar/index.js";
	import CircleSlash from "@lucide/svelte/icons/circle-slash";
	import CircleDot from "@lucide/svelte/icons/circle-dot";
	import ChevronRight from "@lucide/svelte/icons/chevron-right";
	import GraduationCap from "@lucide/svelte/icons/graduation-cap";
	import University from "@lucide/svelte/icons/university";
	import BookMarked from "@lucide/svelte/icons/book-marked";
	import LayoutPanelLeft from "@lucide/svelte/icons/layout-panel-left";
	import Bell from "@lucide/svelte/icons/bell";
	import Settings_2 from "@lucide/svelte/icons/settings-2";
	import CircleDashed from "@lucide/svelte/icons/circle-dashed";
	import Users from "@lucide/svelte/icons/users";
	import GitPullRequestArrow from "@lucide/svelte/icons/git-pull-request-arrow";
	import ChevronsUpDown from "@lucide/svelte/icons/chevrons-up-down";
	import BookText from "@lucide/svelte/icons/book-text";
	import Leaf from "@lucide/svelte/icons/leaf";
	import { slide } from "svelte/transition";

	let drop_composition = $state(true);
	let drop_resource = $state(true);
	let drop_operation = $state(true);
</script>

<Sidebar.Provider>
	<Sidebar.Root>
		<!-- header -->
		<Sidebar.Header>
			<Sidebar.Menu>
				<Sidebar.MenuItem>
					<Sidebar.MenuButton
						size="lg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
						<div
							class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
							<Leaf class="size-4" />
						</div>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-semibold"> USTP 2025 </span>
							<span class="truncate text-xs"> Shared </span>
						</div>
						<ChevronsUpDown class="ml-auto" />
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			</Sidebar.Menu>
		</Sidebar.Header>

		<!-- content -->
		<Sidebar.Content>
			<!-- documentation -->
			<Sidebar.Group>
				<Sidebar.Menu>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton class="cursor-pointer">
							<BookText />
							Documentation
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				</Sidebar.Menu>
			</Sidebar.Group>

			<!-- workspace -->
			<Sidebar.Group class="-mt-4">
				<Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<!-- dashboard -->
					<Sidebar.Menu>
						<Sidebar.MenuItem>
							<Sidebar.MenuButton class="cursor-pointer">
								<LayoutPanelLeft />
								Dashboard
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>

						<!-- notifications -->
						<Sidebar.MenuItem>
							<Sidebar.MenuButton class="cursor-pointer">
								<Bell />
								Notifications
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>

						<!-- settings -->
						<Sidebar.MenuItem>
							<Sidebar.MenuButton class="cursor-pointer">
								<Settings_2 />
								Settings
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>

			<!-- scheduling -->
			<Sidebar.Group class="-mt-4">
				<Sidebar.GroupLabel>Scheduling</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						<!-- composition collapsible -->

						<Sidebar.MenuItem>
							<Sidebar.MenuButton
								class="cursor-pointer"
								onclick={() => (drop_composition = !drop_composition)}>
								<CircleSlash />
								Composition
								<ChevronRight
									class="ml-auto transition-transform duration-200 {drop_composition ? 'rotate-90' : ''}" />
							</Sidebar.MenuButton>
							{#if drop_composition}
								<div transition:slide={{ duration: 100 }}>
									<Sidebar.MenuSub>
										<Sidebar.MenuSubItem>
											<Sidebar.MenuSubButton class="cursor-pointer">
												<GraduationCap />
												Divisions
											</Sidebar.MenuSubButton>
											<Sidebar.MenuSubButton class="mt-1 cursor-pointer">
												<University />
												Facilities
											</Sidebar.MenuSubButton>
										</Sidebar.MenuSubItem>
									</Sidebar.MenuSub>
								</div>
							{/if}
						</Sidebar.MenuItem>

						<!-- resource composition -->
						<Sidebar.MenuItem>
							<Sidebar.MenuButton class="cursor-pointer" onclick={() => (drop_resource = !drop_resource)}>
								<CircleDot />
								Resource
								<ChevronRight
									class="ml-auto transition-transform duration-200 {drop_resource ? 'rotate-90' : ''}" />
							</Sidebar.MenuButton>
							{#if drop_resource}
								<div transition:slide={{ duration: 100 }}>
									<Sidebar.MenuSub>
										<Sidebar.MenuSubItem>
											<Sidebar.MenuSubButton class="cursor-pointer">
												<BookMarked />
												Programs
											</Sidebar.MenuSubButton>
										</Sidebar.MenuSubItem>
									</Sidebar.MenuSub>
								</div>
							{/if}
						</Sidebar.MenuItem>

						<!-- operation collapsible -->
						<Sidebar.MenuItem>
							<Sidebar.MenuButton class="cursor-pointer" onclick={() => (drop_operation = !drop_operation)}>
								<CircleDashed />
								Operation
								<ChevronRight
									class="ml-auto transition-transform duration-200 {drop_operation ? 'rotate-90' : ''}" />
							</Sidebar.MenuButton>
							{#if drop_operation}
								<div transition:slide={{ duration: 100 }}>
									<Sidebar.MenuSub>
										<Sidebar.MenuSubItem>
											<Sidebar.MenuSubButton class="cursor-pointer">
												<Users />
												Faculties
											</Sidebar.MenuSubButton>
											<Sidebar.MenuSubButton class="mt-1 cursor-pointer">
												<GitPullRequestArrow />
												Constraints
											</Sidebar.MenuSubButton>
										</Sidebar.MenuSubItem>
									</Sidebar.MenuSub>
								</div>
							{/if}
						</Sidebar.MenuItem>

						<!-- generate schedule -->
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								<CircleDashed />
								Generation
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>

			<!-- analytics -->
		</Sidebar.Content>

		<!-- footer -->
		<Sidebar.Footer>
			<Sidebar.Menu>
				<Sidebar.MenuItem>
					<Sidebar.MenuButton
						size="lg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
						<Avatar.Root class="size-8 rounded-lg">
							<Avatar.Image src={""} alt={""} />
							<Avatar.Fallback class="rounded-lg">MK</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-medium">{"mihkuno"}</span>
							<span class="truncate text-xs">{"caindayjoeninyo@gmail.com"}</span>
						</div>
						<ChevronsUpDown class="ml-auto size-4" />
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			</Sidebar.Menu>
		</Sidebar.Footer>

		<Sidebar.Rail />
	</Sidebar.Root>
</Sidebar.Provider>
