<script lang="ts">
	// icons
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
	import BookText from "@lucide/svelte/icons/book-text";
	import Leaf from "@lucide/svelte/icons/leaf";
	// transitions
	import { slide } from "svelte/transition";
	// shadcn/ui
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	// custom components
	import NavWorkspace from "$lib/components/nav-workspace.svelte";
	import NavUser from "$lib/components/nav-user.svelte";

	let drop_composition = $state(true);
	let drop_resource = $state(true);
	let drop_operation = $state(true);
</script>

<Sidebar.Provider>
	<Sidebar.Root>
		<!-- header -->
		<Sidebar.Header>
			<NavWorkspace
				workspaces={[
					{
						name: "USTP 2024",
						logo: Leaf,
						plan: "Shared",
					},
					{
						name: "BSCS 2025",
						logo: Leaf,
						plan: "Local",
					},
				]} />
		</Sidebar.Header>

		<!-- content -->
		<Sidebar.Content>
			<!-- documentation -->
			<Sidebar.Group>
				<Sidebar.Menu>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton class="cursor-pointer select-none">
							<BookText />
							Documentation
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				</Sidebar.Menu>
			</Sidebar.Group>

			<!-- workspace -->
			<Sidebar.Group class="-mt-4">
				<Sidebar.GroupLabel class="cursor-default select-none">Workspace</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<!-- dashboard -->
					<Sidebar.Menu>
						<Sidebar.MenuItem>
							<Sidebar.MenuButton class="cursor-pointer select-none">
								<LayoutPanelLeft />
								Dashboard
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>

						<!-- notifications -->
						<Sidebar.MenuItem>
							<Sidebar.MenuButton class="cursor-pointer select-none">
								<Bell />
								Notifications
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>

						<!-- settings -->
						<Sidebar.MenuItem>
							<Sidebar.MenuButton class="cursor-pointer select-none">
								<Settings_2 />
								Settings
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>

			<!-- scheduling -->
			<Sidebar.Group class="-mt-4">
				<Sidebar.GroupLabel class="cursor-default select-none">Scheduling</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						<!-- composition collapsible -->

						<Sidebar.MenuItem>
							<Sidebar.MenuButton
								class="cursor-pointer select-none"
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
											<Sidebar.MenuSubButton class="cursor-pointer select-none">
												<GraduationCap />
												Divisions
											</Sidebar.MenuSubButton>
											<Sidebar.MenuSubButton class="mt-1 cursor-pointer select-none">
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
							<Sidebar.MenuButton
								class="cursor-pointer select-none"
								onclick={() => (drop_resource = !drop_resource)}>
								<CircleDot />
								Resource
								<ChevronRight
									class="ml-auto transition-transform duration-200 {drop_resource ? 'rotate-90' : ''}" />
							</Sidebar.MenuButton>
							{#if drop_resource}
								<div transition:slide={{ duration: 100 }}>
									<Sidebar.MenuSub>
										<Sidebar.MenuSubItem>
											<Sidebar.MenuSubButton class="cursor-pointer select-none">
												<BookMarked />
												Programs
											</Sidebar.MenuSubButton>
										</Sidebar.MenuSubItem>
									</Sidebar.MenuSub>
								</div>
							{/if}
						</Sidebar.MenuItem>

						<!-- operation collapsible -->
						<Sidebar.MenuItem class="opacity-50">
							<Sidebar.MenuButton
								class="cursor-not-allowed select-none"
								onclick={() => (drop_operation = !drop_operation)}>
								<CircleDashed />
								Operation
								<ChevronRight
									class="ml-auto transition-transform duration-200 {drop_operation ? 'rotate-90' : ''}" />
							</Sidebar.MenuButton>
							{#if drop_operation}
								<div transition:slide={{ duration: 100 }}>
									<Sidebar.MenuSub>
										<Sidebar.MenuSubItem>
											<Sidebar.MenuSubButton class="cursor-not-allowed select-none">
												<Users />
												Faculties
											</Sidebar.MenuSubButton>
											<Sidebar.MenuSubButton class="mt-1 cursor-not-allowed select-none">
												<GitPullRequestArrow />
												Constraints
											</Sidebar.MenuSubButton>
										</Sidebar.MenuSubItem>
									</Sidebar.MenuSub>
								</div>
							{/if}
						</Sidebar.MenuItem>

						<!-- generate schedule -->
						<Sidebar.MenuItem class="opacity-50">
							<Sidebar.MenuButton class="cursor-not-allowed select-none">
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
			<NavUser
				user={{
					name: "mihkuno",
					email: "caindayjoeninyo@gmail.com",
					avatar: "/avatar.png",
				}} />
		</Sidebar.Footer>

		<Sidebar.Rail />
	</Sidebar.Root>
</Sidebar.Provider>
