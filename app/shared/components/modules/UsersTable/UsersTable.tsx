import { useTranslation } from "react-i18next";
import { Table as MTable } from "@mantine/core";

import { TableTd, TableTh } from "../../ui/TableElements";
import { StyledNavLink } from "../../ui/StyledNavLink";

import { formatDateWithTime } from "~/shared/utils/dateFormat";

import { NavigationLink } from "~/shared/constants/navigation";
import type { TUsersTable } from "./UsersTable.types";

export const UsersTable = ({ users }: TUsersTable) => {
  const { t } = useTranslation("user");

  const rows = users.map((user) => {
    const formattedCreatedDate = formatDateWithTime(user.createdAt);
    const formattedUpdatedDate = formatDateWithTime(user.updatedAt);
    const formattedDeletedDate = formatDateWithTime(user.deletedAt);

    return (
      <MTable.Tr key={user.id}>
        <TableTd>
          <StyledNavLink
            variant='accent'
            to={`${NavigationLink.DASHBOARD_USERS}/${user.id}`}
          >
            {t("buttons.button.edit", { ns: "common" })}
          </StyledNavLink>
        </TableTd>
        <TableTd>{user.lastName}</TableTd>
        <TableTd>{user.firstName}</TableTd>
        <TableTd>{user.email}</TableTd>
        <TableTd>{user.role}</TableTd>
        <TableTd>{formattedCreatedDate}</TableTd>
        <TableTd>{formattedUpdatedDate ? formattedUpdatedDate : ""}</TableTd>
        <TableTd>
          {user.updatedBy?.lastName} {user.updatedBy?.firstName}
        </TableTd>
        <TableTd>{formattedDeletedDate ? formattedDeletedDate : ""}</TableTd>
      </MTable.Tr>
    );
  });

  return (
    <MTable.ScrollContainer type='scrollarea' minWidth={500}>
      <MTable highlightOnHover withColumnBorders>
        <MTable.Thead>
          <MTable.Tr>
            <TableTh>{""}</TableTh>
            <TableTh>{t("userData.lastName")}</TableTh>
            <TableTh>{t("userData.firstName")}</TableTh>
            <TableTh>{t("userData.email")}</TableTh>
            <TableTh>{t("userData.role")}</TableTh>
            <TableTh>{t("userData.createdAt")}</TableTh>
            <TableTh>{t("userData.updatedAt")}</TableTh>
            <TableTh>{t("userData.updatedBy")}</TableTh>
            <TableTh>{t("userData.deletedAt")}</TableTh>
          </MTable.Tr>
        </MTable.Thead>

        <MTable.Tbody>{rows}</MTable.Tbody>
      </MTable>
    </MTable.ScrollContainer>
  );
};
