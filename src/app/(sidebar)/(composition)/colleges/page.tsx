
import Composition from "@/app/(sidebar)/(composition)/composition";

export default function Page() {


	return (
		<Composition
			compositionType="College"
			compositionCaption="Select a college to manage its departments."
			tableHeader={[]}
			tableData={[]}
			inputPlaceholder={
				{
					type: "College",
					name: "e.g., College of Engineering",
				}
			}
		/>
	);
}
